import type { Vehicle } from '@/core/domain/vehicle/vehicle.types';
import { asyncStorageAdapter } from '@/core/storage/async-storage.adapter';
import { StorageKeys } from '@/core/storage/storage.keys';

import type { VehicleRepository } from './vehicle.repository';

export class LocalVehicleRepository implements VehicleRepository {
  async getByUserId(userId: string): Promise<Vehicle | null> {
    const vehicles = await this.getVehicles();
    return vehicles.find((vehicle) => vehicle.userId === userId) ?? null;
  }

  // Cada motorista tem um único veículo: salvar substitui o anterior.
  async saveVehicle(vehicle: Vehicle): Promise<void> {
    const vehicles = await this.getVehicles();
    await asyncStorageAdapter.set(StorageKeys.vehicles, [
      ...vehicles.filter((storedVehicle) => storedVehicle.userId !== vehicle.userId),
      vehicle,
    ]);
  }

  async deleteByUserId(userId: string): Promise<void> {
    const vehicles = await this.getVehicles();
    await asyncStorageAdapter.set(
      StorageKeys.vehicles,
      vehicles.filter((vehicle) => vehicle.userId !== userId),
    );
  }

  clearAll(): Promise<void> {
    return asyncStorageAdapter.remove(StorageKeys.vehicles);
  }

  private async getVehicles(): Promise<Vehicle[]> {
    return (await asyncStorageAdapter.get<Vehicle[]>(StorageKeys.vehicles)) ?? [];
  }
}

export const vehicleRepository: VehicleRepository = new LocalVehicleRepository();
