import type { Vehicle } from '@/core/domain/vehicle/vehicle.types';

export interface VehicleRepository {
  getByUserId(userId: string): Promise<Vehicle | null>;
  saveVehicle(vehicle: Vehicle): Promise<void>;
  clearAll(): Promise<void>;
}
