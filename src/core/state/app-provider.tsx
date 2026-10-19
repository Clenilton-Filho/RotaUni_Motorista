import * as Crypto from 'expo-crypto';
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react';

import type { CreateAccountInput, UserAccount } from '@/core/domain/auth/user-account.types';
import type { CreateUserInput, UserProfile } from '@/core/domain/user/user.types';
import { normalizePlate, type Vehicle, type VehicleInput } from '@/core/domain/vehicle/vehicle.types';
import { sessionRepository } from '@/core/services/auth/local-session.repository';
import { userAccountRepository } from '@/core/services/auth/user-account.repository';
import { rideRequestsRepository } from '@/core/services/requests/local-ride-requests.repository';
import { ridesRepository } from '@/core/services/rides/local-rides.repository';
import { userRepository } from '@/core/services/user/user.repository';
import { vehicleRepository } from '@/core/services/vehicle/local-vehicle.repository';

type AppState = {
  currentAccount: UserAccount | null;
  currentUser: UserProfile | null;
  currentVehicle: Vehicle | null;
  isHydrated: boolean;
  register: (account: CreateAccountInput, profile: CreateUserInput, vehicle: VehicleInput) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  updateUser: (user: UserProfile) => Promise<void>;
  updateVehicle: (vehicle: VehicleInput) => Promise<void>;
  logout: () => Promise<void>;
  resetLocalData: () => Promise<void>;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [currentAccount, setCurrentAccount] = useState<UserAccount | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      const session = await sessionRepository.getCurrentSession();
      if (!session) return;
      const account = await userAccountRepository.getById(session.accountId);
      const profile = account ? await userRepository.getByUserId(account.id) : null;
      const vehicle = account ? await vehicleRepository.getByUserId(account.id) : null;

      if (account && profile) {
        setCurrentAccount(account);
        setCurrentUser(profile);
        setCurrentVehicle(vehicle);
      }
    }

    hydrate().finally(() => setIsHydrated(true));
  }, []);

  async function register(
    accountInput: CreateAccountInput,
    profileInput: CreateUserInput,
    vehicleInput: VehicleInput,
  ) {
    const account = await userAccountRepository.createAccount(accountInput);
    const createdAt = new Date().toISOString();

    await userRepository.saveProfile({ ...profileInput, userId: account.id, createdAt });
    await vehicleRepository.saveVehicle(buildVehicle(account.id, vehicleInput, createdAt));
  }

  async function login(email: string, password: string) {
    const account = await userAccountRepository.verifyCredentials(email, password);
    if (!account) return false;
    const profile = await userRepository.getByUserId(account.id);
    if (!profile) return false;
    const vehicle = await vehicleRepository.getByUserId(account.id);

    await sessionRepository.saveSession({ accountId: account.id });
    setCurrentAccount(account);
    setCurrentUser(profile);
    setCurrentVehicle(vehicle);
    return true;
  }

  async function updateUser(user: UserProfile) {
    await userRepository.updateProfile(user);
    setCurrentUser(user);
  }

  async function updateVehicle(vehicleInput: VehicleInput) {
    if (!currentAccount) return;

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
        updateUser,
        updateVehicle,
        logout,
        resetLocalData,
      }}>
      {children}
    </AppContext.Provider>
  );
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
