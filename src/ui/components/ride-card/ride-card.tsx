import { Pressable, View } from 'react-native';

import { getRemainingSeats, type Ride } from '@/core/domain/rides/ride.types';

import { RideStatusBadge } from '@/ui/components/ride-status-badge/ride-status-badge';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';
import { formatPrice, pluralize } from '@/ui/utils/format';

import { styles } from './ride-card.styles';

type RideCardProps = {
  ride: Ride;
  footer?: string;
  onPress?: () => void;
};

export function RideCard({ ride, footer, onPress }: RideCardProps) {
  const remainingSeats = getRemainingSeats(ride);

  const card = (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.title}>
          <ThemedText type="smallBold">
            {ride.origin} → {ride.destination}
          </ThemedText>
          <ThemedText themeColor="textSecondary">Saída às {ride.departureTime}</ThemedText>
        </View>
        <RideStatusBadge status={ride.status} />
      </View>

      <View style={styles.details}>
        <ThemedText>
          Passageiros: {ride.confirmedPassengers}/{ride.totalCapacity}
          {ride.status === 'scheduled' && remainingSeats > 0
            ? ` • ${pluralize(remainingSeats, 'vaga livre', 'vagas livres')}`
            : ''}
        </ThemedText>
        <ThemedText type="smallBold">{formatPrice(ride.price)}</ThemedText>
      </View>

      {footer ? (
        <ThemedText type="small" themeColor="textSecondary">
          {footer}
        </ThemedText>
      ) : null}
    </ThemedView>
  );

  if (!onPress) return card;

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {card}
    </Pressable>
  );
}
