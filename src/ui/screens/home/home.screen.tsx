import { router } from 'expo-router';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { getRideEarnings, isActiveRide } from '@/core/domain/rides/ride.types';
import { useDriverRides } from '@/core/hooks/use-driver-rides';
import { useAppState } from '@/core/state/app-provider';

import { AppButton } from '@/ui/components/app-button/app-button';
import { RideCard } from '@/ui/components/ride-card/ride-card';
import { Screen } from '@/ui/components/screen/screen';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';
import { formatCurrency, pluralize } from '@/ui/utils/format';

import { styles } from './home.styles';

export default function HomeScreen() {
  const { currentUser, currentVehicle } = useAppState();
  const { rides, isLoading, error } = useDriverRides();

  if (!currentUser) return null;

  const activeRides = rides
    .filter(isActiveRide)
    // A carona em andamento aparece primeiro.
    .sort((first, second) => Number(second.status === 'in-progress') - Number(first.status === 'in-progress'));
  const completedRides = rides.filter((ride) => ride.status === 'completed');
  const totalPassengers = completedRides.reduce((total, ride) => total + ride.confirmedPassengers, 0);
  const totalEarnings = completedRides.reduce((total, ride) => total + getRideEarnings(ride), 0);

  return (
    <Screen>
      <View style={styles.header}>
        <ThemedText type="subtitle">Olá, {currentUser.name}!</ThemedText>
        <ThemedText themeColor="textSecondary">Suas caronas saem de:</ThemedText>
        <ThemedText type="smallBold">{currentUser.campus}</ThemedText>
        <View style={styles.headerActions}>
          <Pressable onPress={() => router.push('/perfil')}>
            <ThemedText type="linkPrimary">Perfil</ThemedText>
          </Pressable>
          <Pressable onPress={() => router.push('/historico')}>
            <ThemedText type="linkPrimary">Histórico</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.stats}>
        <StatTile label="Caronas feitas" value={String(completedRides.length)} />
        <StatTile label="Passageiros levados" value={String(totalPassengers)} />
        <StatTile label="Arrecadado" value={formatCurrency(totalEarnings)} />
      </View>

      {currentVehicle ? (
        <AppButton label="+ Oferecer carona" onPress={() => router.push('/nova-carona')} />
      ) : (
        <ThemedView type="backgroundElement" style={styles.warning}>
          <ThemedText style={styles.warningText}>Cadastre um veículo para oferecer caronas.</ThemedText>
          <AppButton compact variant="outline" label="Cadastrar veículo" onPress={() => router.push('/veiculo')} />
        </ThemedView>
      )}

      <ThemedText type="subtitle" style={styles.sectionTitle}>
        Minhas caronas
      </ThemedText>

      {isLoading ? (
        <View style={styles.feedback}>
          <ActivityIndicator />
          <ThemedText themeColor="textSecondary">Carregando caronas...</ThemedText>
        </View>
      ) : error ? (
        <ThemedText style={styles.error}>{error}</ThemedText>
      ) : activeRides.length === 0 ? (
        <ThemedText themeColor="textSecondary">
          Você não tem caronas agendadas. Que tal oferecer uma agora?
        </ThemedText>
      ) : (
        <View style={styles.ridesList}>
          {activeRides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              footer={
                ride.status === 'in-progress'
                  ? `Em andamento com ${pluralize(ride.confirmedPassengers, 'passageiro', 'passageiros')}`
                  : 'Toque para gerenciar passageiros'
              }
              onPress={() => router.push({ pathname: '/caronas/[rideId]', params: { rideId: ride.id } })}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView type="backgroundElement" style={styles.statTile}>
      <ThemedText type="smallBold" style={styles.statValue}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </ThemedView>
  );
}
