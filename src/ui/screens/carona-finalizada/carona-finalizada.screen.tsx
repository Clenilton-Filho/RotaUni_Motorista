import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { getRideEarnings } from '@/core/domain/rides/ride.types';
import { useRide } from '@/core/hooks/use-ride';

import { AppButton } from '@/ui/components/app-button/app-button';
import { InfoRow } from '@/ui/components/info-row/info-row';
import { Screen } from '@/ui/components/screen/screen';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';
import { formatCurrency, pluralize } from '@/ui/utils/format';

import { styles } from './carona-finalizada.styles';

export default function FinishedRideScreen() {
  const { rideId } = useLocalSearchParams<{ rideId: string }>();
  const { ride, isLoading } = useRide(rideId);

  return (
    <Screen>
      <View style={styles.content}>
        <ThemedText style={styles.check}>✓</ThemedText>
        <ThemedText type="subtitle" style={styles.title}>
          Carona finalizada!
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.centered}>
          Obrigado por levar outros universitários pelo seu caminho.
        </ThemedText>

        {isLoading ? (
          <ActivityIndicator />
        ) : ride ? (
          <ThemedView type="backgroundElement" style={styles.card}>
            <InfoRow label="Trajeto" value={`${ride.origin} → ${ride.destination}`} />
            <InfoRow
              label="Passageiros levados"
              value={pluralize(ride.confirmedPassengers, 'passageiro', 'passageiros')}
            />
            <InfoRow
              label="Arrecadado"
              value={ride.price === null ? 'Carona gratuita' : formatCurrency(getRideEarnings(ride))}
            />
          </ThemedView>
        ) : null}
      </View>

      <View style={styles.actions}>
        <AppButton label="Voltar ao início" onPress={() => router.replace('/')} />
        <AppButton variant="outline" label="Ver histórico" onPress={() => router.replace('/historico')} />
      </View>
    </Screen>
  );
}
