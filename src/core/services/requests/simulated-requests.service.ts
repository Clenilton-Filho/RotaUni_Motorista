import * as Crypto from 'expo-crypto';

import { mockPassengers } from '@/core/data/passengers';
import type { RideRequest } from '@/core/domain/requests/ride-request.types';
import type { Ride } from '@/core/domain/rides/ride.types';

const SIMULATED_REQUESTS_PER_RIDE = 3;

/**
 * Simula passageiros pedindo para entrar em uma carona recém-criada.
 * Existe apenas no protótipo local: com o backend, as solicitações chegam do app do passageiro.
 */
export function createSimulatedRequests(ride: Ride): RideRequest[] {
  const randomBytes = Crypto.getRandomBytes(mockPassengers.length);
  const shuffledPassengers = mockPassengers
    .map((passenger, index) => ({ passenger, weight: randomBytes[index] }))
    .sort((first, second) => first.weight - second.weight)
    .map(({ passenger }) => passenger);
  const now = Date.now();

  return shuffledPassengers.slice(0, SIMULATED_REQUESTS_PER_RIDE).map((passenger, index) => ({
    id: Crypto.randomUUID(),
    rideId: ride.id,
    passenger,
    status: 'pending',
    createdAt: new Date(now + index).toISOString(),
  }));
}
