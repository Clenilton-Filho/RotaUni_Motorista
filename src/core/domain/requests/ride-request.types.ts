export type RideRequestStatus = 'pending' | 'accepted' | 'rejected';

export type RequestPassenger = {
  id: string;
  name: string;
  university: string;
  course: string;
  rating: number;
};

export type RideRequest = {
  id: string;
  rideId: string;
  passenger: RequestPassenger;
  status: RideRequestStatus;
  createdAt: string;
  respondedAt?: string;
};
