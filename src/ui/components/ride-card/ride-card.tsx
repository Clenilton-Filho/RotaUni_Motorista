import { Pressable, View } from 'react-native';

import { getRemainingSeats, type Ride } from '@/core/domain/rides/ride.types';

import { RideStatusBadge, rideStatusLabel } from '@/ui/components/ride-status-badge/ride-status-badge';
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
  // Frase única lida pelo leitor de tela, no lugar dos vários textos soltos do cartão.
  const accessibilityLabel = [
    `Carona de ${ride.origin} para ${ride.destination}`,
    `saída às ${ride.departureTime}`,
    rideStatusLabel[ride.status],
    `${ride.confirmedPassengers} de ${ride.totalCapacity} passageiros`,
    formatPrice(ride.price),
    footer,
  ]
    .filter(Boolean)
    .join(', ');

  const content = (
    <>
      <View style={styles.header}>
        <View style={styles.title}>
          <ThemedText style={styles.route}>
            {ride.origin} → {ride.destination}
          </ThemedText>
          <ThemedText style={styles.time}>Saída às {ride.departureTime}</ThemedText>
        </View>
        <RideStatusBadge status={ride.status} />
      </View>

      <View style={styles.divider} />

      <View style={styles.details}>
        <ThemedText style={styles.passengers}>
          {ride.confirmedPassengers}/{ride.totalCapacity} passageiros
          {ride.status === 'scheduled' && remainingSeats > 0
            ? ` • ${pluralize(remainingSeats, 'vaga livre', 'vagas livres')}`
            : ''}
        </ThemedText>
        <ThemedText style={styles.price}>{formatPrice(ride.price)}</ThemedText>
      </View>

      {footer ? <ThemedText style={styles.footer}>{footer}</ThemedText> : null}
    </>
  );

  if (!onPress) {
    return (
      <ThemedView type="backgroundElement" style={styles.card} accessible accessibilityLabel={accessibilityLabel}>
        {content}
      </ThemedView>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Abre os detalhes da carona"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}
