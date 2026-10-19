import type { Ride } from '@/core/domain/rides/ride.types';
import { asyncStorageAdapter } from '@/core/storage/async-storage.adapter';
import { StorageKeys } from '@/core/storage/storage.keys';

import type { RidesRepository } from './rides.repository';

export class LocalRidesRepository implements RidesRepository {
  private createOperation: Promise<Ride> | null = null;

  async listByDriver(driverId: string): Promise<Ride[]> {
    const rides = await this.getRides();
    return rides
      .filter((ride) => ride.driver.id === driverId)
      .sort((first, second) => first.departureTime.localeCompare(second.departureTime));
  }

  async getRideById(id: string): Promise<Ride | null> {
    const rides = await this.getRides();
    return rides.find((ride) => ride.id === id) ?? null;
  }

  // Proteção contra duplo toque: enquanto uma criação está em andamento, devolve a mesma promise.
  async createRide(ride: Ride): Promise<Ride> {
    if (this.createOperation) return this.createOperation;

    this.createOperation = this.persistNewRide(ride);

    try {
      return await this.createOperation;
    } finally {
      this.createOperation = null;
    }
  }

  async updateRide(ride: Ride): Promise<Ride> {
    const rides = await this.getRides();
    await asyncStorageAdapter.set(
      StorageKeys.rides,
      rides.map((storedRide) => (storedRide.id === ride.id ? ride : storedRide)),
    );
    return ride;
  }

  async clearAll(): Promise<void> {
    this.createOperation = null;
    await asyncStorageAdapter.remove(StorageKeys.rides);
  }

  private async persistNewRide(ride: Ride): Promise<Ride> {
    const rides = await this.getRides();
    await asyncStorageAdapter.set(StorageKeys.rides, [...rides, ride]);
    return ride;
  }

  private async getRides(): Promise<Ride[]> {
    return (await asyncStorageAdapter.get<Ride[]>(StorageKeys.rides)) ?? [];
  }
}

export const ridesRepository: RidesRepository = new LocalRidesRepository();
