import * as Crypto from 'expo-crypto';
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import { normalizeEmail } from '@/core/domain/auth/email';
import { normalizeProfileInput, validateRegistration, ValidationError } from '@/core/domain/auth/registration';
import type { CreateAccountInput, UserAccount } from '@/core/domain/auth/user-account.types';
import type { CreateUserInput, UserProfile } from '@/core/domain/user/user.types';
import {
  normalizePlate,
  validateVehicleInput,
  type Vehicle,
  type VehicleInput,
} from '@/core/domain/vehicle/vehicle.types';
import { sessionRepository } from '@/core/services/auth/local-session.repository';
import { userAccountRepository } from '@/core/services/auth/user-account.repository';
import { rideRequestsRepository } from '@/core/services/requests/local-ride-requests.repository';
import { ridesRepository } from '@/core/services/rides/local-rides.repository';
import { userRepository } from '@/core/services/user/user.repository';
import { vehicleRepository } from '@/core/services/vehicle/local-vehicle.repository';

// O que as telas enxergam da conta: sem hash e salt da senha.
export type CurrentAccount = Pick<UserAccount, 'id' | 'email' | 'createdAt'>;

type AppState = {
  currentAccount: CurrentAccount | null;
  currentUser: UserProfile | null;
  currentVehicle: Vehicle | null;
  isHydrated: boolean;
  register: (account: CreateAccountInput, profile: CreateUserInput, vehicle: VehicleInput) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  updateVehicle: (vehicle: VehicleInput) => Promise<void>;
  logout: () => Promise<void>;
  resetLocalData: () => Promise<void>;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [currentAccount, setCurrentAccount] = useState<CurrentAccount | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      const session = await sessionRepository.getCurrentSession();
      if (!session) return;
      const account = await userAccountRepository.getById(session.accountId);
      const profile = account ? await userRepository.getByUserId(account.id) : null;

      if (!account || !profile) {
        // Sessão órfã (conta ou perfil não existem mais): descarta.
        await sessionRepository.clearSession();
        return;
      }

      const vehicle = await vehicleRepository.getByUserId(account.id);
      setCurrentAccount(toCurrentAccount(account));
      setCurrentUser(profile);
      setCurrentVehicle(vehicle);
    }

    hydrate()
      .catch(() => {})
      .finally(() => setIsHydrated(true));
  }, []);

  async function register(
    accountInput: CreateAccountInput,
    profileInput: CreateUserInput,
    vehicleInput: VehicleInput,
  ) {
    const validationError = validateRegistration({
      profile: profileInput,
      email: accountInput.email,
      password: accountInput.password,
      vehicle: vehicleInput,
    });
    if (validationError) throw new ValidationError(validationError);

    const account = await userAccountRepository.createAccount({
      email: normalizeEmail(accountInput.email),
      password: accountInput.password,
    });
    const createdAt = new Date().toISOString();
    const profile: UserProfile = { ...normalizeProfileInput(profileInput), userId: account.id, createdAt };
    const vehicle = buildVehicle(account.id, vehicleInput, createdAt);

    try {
      await userRepository.saveProfile(profile);
      await vehicleRepository.saveVehicle(vehicle);
      // Depois de criar a conta, o motorista já entra nela.
      await sessionRepository.saveSession({ accountId: account.id });
    } catch (saveError) {
      // Desfaz o cadastro pela metade, senão o email ficaria "já cadastrado" numa conta sem perfil.
      await rollbackRegistration(account.id);
      throw saveError;
    }

    setCurrentAccount(toCurrentAccount(account));
    setCurrentUser(profile);
    setCurrentVehicle(vehicle);
  }

  async function login(email: string, password: string) {
    const account = await userAccountRepository.verifyCredentials(email, password);
    if (!account) return false;
    const profile = await userRepository.getByUserId(account.id);
    if (!profile) return false;
    const vehicle = await vehicleRepository.getByUserId(account.id);

    await sessionRepository.saveSession({ accountId: account.id });
    setCurrentAccount(toCurrentAccount(account));
    setCurrentUser(profile);
    setCurrentVehicle(vehicle);
    return true;
  }

  async function updateVehicle(vehicleInput: VehicleInput) {
    if (!currentAccount) return;

    const validationError = validateVehicleInput(vehicleInput);
    if (validationError) throw new ValidationError(validationError);

    const vehicle = {
      ...buildVehicle(currentAccount.id, vehicleInput, currentVehicle?.createdAt ?? new Date().toISOString()),
      id: currentVehicle?.id ?? Crypto.randomUUID(),
    };
    await vehicleRepository.saveVehicle(vehicle);
    setCurrentVehicle(vehicle);
  }

  async function logout() {
    await sessionRepository.clearSession();
    setCurrentAccount(null);
    setCurrentUser(null);
    setCurrentVehicle(null);
  }

  async function resetLocalData() {
    await Promise.all([
      sessionRepository.clearSession(),
      userAccountRepository.clearAll(),
      userRepository.clearAll(),
      vehicleRepository.clearAll(),
      ridesRepository.clearAll(),
      rideRequestsRepository.clearAll(),
    ]);
    setCurrentAccount(null);
    setCurrentUser(null);
    setCurrentVehicle(null);
  }

  return (
    <AppContext.Provider
      value={{
        currentAccount,
        currentUser,
        currentVehicle,
        isHydrated,
        register,
        login,
        updateVehicle,
        logout,
        resetLocalData,
      }}>
      {children}
    </AppContext.Provider>
  );
}

// Cada exclusão roda mesmo se outra falhar (allSettled): remove o máximo possível.
async function rollbackRegistration(accountId: string) {
  await Promise.allSettled([
    sessionRepository.clearSession(),
    vehicleRepository.deleteByUserId(accountId),
    userRepository.deleteProfile(accountId),
    userAccountRepository.deleteAccount(accountId),
  ]);
}

function toCurrentAccount({ id, email, createdAt }: UserAccount): CurrentAccount {
  return { id, email, createdAt };
}

function buildVehicle(userId: string, input: VehicleInput, createdAt: string): Vehicle {
  return {
    id: Crypto.randomUUID(),
    userId,
    model: input.model.trim(),
    color: input.color.trim(),
    plate: normalizePlate(input.plate),
    seats: input.seats,
    createdAt,
  };
}

export function useAppState() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppState must be used within AppProvider');
  }

  return context;
}
