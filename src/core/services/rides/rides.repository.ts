import type { Ride } from '@/core/domain/rides/ride.types';

export interface RidesRepository {
  listByDriver(driverId: string): Promise<Ride[]>;
  getRideById(id: string): Promise<Ride | null>;
  createRide(ride: Ride): Promise<Ride>;
  updateRide(ride: Ride): Promise<Ride>;
  clearAll(): Promise<void>;
}
