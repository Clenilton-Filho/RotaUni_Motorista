import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import type { Ride } from '@/core/domain/rides/ride.types';
import { ridesRepository } from '@/core/services/rides/local-rides.repository';
import { useAppState } from '@/core/state/app-provider';

/**
 * Caronas do motorista logado. Recarrega sempre que a tela ganha foco,
 * para refletir o que mudou nas telas de criação e de detalhes.
 */
export function useDriverRides() {
  const { currentUser } = useAppState();
  const [rides, setRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      if (!currentUser) {
        Promise.resolve().then(() => {
          if (!isMounted) return;
          setRides([]);
          setIsLoading(false);
        });
        return () => {
          isMounted = false;
        };
      }

      ridesRepository
        .listByDriver(currentUser.userId)
        .then((loadedRides) => {
          if (!isMounted) return;
          setRides(loadedRides);
          setError(null);
        })
        .catch(() => {
          if (isMounted) setError('Não foi possível carregar suas caronas.');
        })
        .finally(() => {
          if (isMounted) setIsLoading(false);
        });

      return () => {
        isMounted = false;
      };
    }, [currentUser]),
  );

  return { rides, isLoading, error };
}
