import { useState } from 'react';

import type { CreateRideInput } from '@/core/domain/rides/ride.types';
import { createRide as createRideService, RideRuleError } from '@/core/services/rides/ride-management.service';
import { useAppState } from '@/core/state/app-provider';

export function useCreateRide() {
  const { currentUser, currentVehicle } = useAppState();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createRide(input: CreateRideInput) {
    if (!currentUser) {
      setError('Usuário não encontrado.');
      return null;
    }

    if (!currentVehicle) {
      setError('Cadastre um veículo antes de oferecer caronas.');
      return null;
    }

    if (isSaving) return null;

    setIsSaving(true);
    setError(null);

    try {
      return await createRideService({
        // A nota do motorista virá das avaliações dos passageiros quando existir o backend.
        driver: { id: currentUser.userId, name: currentUser.name, rating: null },
        vehicle: currentVehicle,
        origin: currentUser.campus,
        input,
      });
    } catch (createError) {
      setError(createError instanceof RideRuleError ? createError.message : 'Não foi possível criar a carona.');
      return null;
    } finally {
      setIsSaving(false);
    }
  }

  return { createRide, isSaving, error, setError };
}
