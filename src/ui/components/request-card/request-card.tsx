import { View } from 'react-native';

import type { RideRequest } from '@/core/domain/requests/ride-request.types';

import { AppButton } from '@/ui/components/app-button/app-button';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';

import { styles } from './request-card.styles';

type RequestCardProps = {
  request: RideRequest;
  canRespond: boolean;
  canAccept: boolean;
  isBusy: boolean;
  onAccept: () => void;
  onReject: () => void;
};

const statusLabel = {
  pending: 'Aguardando resposta',
  accepted: 'Aceito',
  rejected: 'Recusado',
} as const;

export function RequestCard({ request, canRespond, canAccept, isBusy, onAccept, onReject }: RequestCardProps) {
  const { passenger, status } = request;
  const showActions = canRespond && status === 'pending';

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.info}>
          <ThemedText type="smallBold">{passenger.name}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {passenger.course} • {passenger.university}
          </ThemedText>
        </View>
        <ThemedText style={styles.rating}>★ {passenger.rating.toFixed(1)}</ThemedText>
      </View>

      {showActions ? (
        <View style={styles.actions}>
          <View style={styles.action}>
            <AppButton compact variant="outline" label="Recusar" disabled={isBusy} onPress={onReject} />
          </View>
          <View style={styles.action}>
            <AppButton
              compact
              variant="success"
              label={canAccept ? 'Aceitar' : 'Lotada'}
              disabled={isBusy || !canAccept}
              onPress={onAccept}
            />
          </View>
        </View>
      ) : (
        <ThemedText
          type="small"
          style={[
            status === 'accepted' && styles.accepted,
            status === 'rejected' && styles.rejected,
          ]}
          themeColor="textSecondary">
          {statusLabel[status]}
        </ThemedText>
      )}
    </ThemedView>
  );
}
