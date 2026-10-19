import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import type { RideRequest } from '@/core/domain/requests/ride-request.types';
import type { Ride } from '@/core/domain/rides/ride.types';
import { rideRequestsRepository } from '@/core/services/requests/local-ride-requests.repository';
import { ridesRepository } from '@/core/services/rides/local-rides.repository';
import { useAppState } from '@/core/state/app-provider';

/**
 * Uma carona do motorista logado e as solicitações de passageiros dela.
 */
export function useRide(rideId: string | undefined) {
  const { currentUser } = useAppState();
  const [ride, setRide] = useState<Ride | null>(null);
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadCount, setReloadCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      if (!rideId || !currentUser) {
        Promise.resolve().then(() => {
          if (!isMounted) return;
          setError('Carona não informada.');
          setIsLoading(false);
        });
        return () => {
          isMounted = false;
        };
      }

      Promise.all([ridesRepository.getRideById(rideId), rideRequestsRepository.listByRide(rideId)])
        .then(([loadedRide, loadedRequests]) => {
          if (!isMounted) return;
          const isOwnRide = loadedRide?.driver.id === currentUser.userId;
          setRide(isOwnRide ? loadedRide : null);
          setRequests(isOwnRide ? loadedRequests : []);
          setError(null);
        })
        .catch(() => {
          if (isMounted) setError('Não foi possível carregar a carona.');
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });

      return () => {
        isMounted = false;
      };
      // reloadCount força uma nova leitura após uma ação na própria tela.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, rideId, reloadCount]),
  );

  const reload = useCallback(() => setReloadCount((count) => count + 1), []);

  return { ride, requests, isLoading, error, reload };
}
