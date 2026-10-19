import type { RideRequest } from '@/core/domain/requests/ride-request.types';

export interface RideRequestsRepository {
  listByRide(rideId: string): Promise<RideRequest[]>;
  saveRequests(requests: RideRequest[]): Promise<void>;
  updateRequest(request: RideRequest): Promise<RideRequest>;
  clearAll(): Promise<void>;
}
