import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { MAX_DESTINATION_LENGTH, MAX_RIDE_PRICE } from '@/core/domain/rides/ride.types';
import { useCreateRide } from '@/core/hooks/use-create-ride';
import { useAppState } from '@/core/state/app-provider';

import { AppButton } from '@/ui/components/app-button/app-button';
import { FormField } from '@/ui/components/form-field/form-field';
import { Screen } from '@/ui/components/screen/screen';
import { Stepper } from '@/ui/components/stepper/stepper';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { maskTime, parsePrice } from '@/ui/utils/format';

import { styles } from './nova-carona.styles';

export default function NewRideScreen() {
  const { currentUser, currentVehicle } = useAppState();
  const { createRide, isSaving, error, setError } = useCreateRide();
  const maxSeats = currentVehicle?.seats ?? 1;
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [capacity, setCapacity] = useState(Math.min(3, maxSeats));
  const [isFree, setIsFree] = useState(false);
  const [priceText, setPriceText] = useState('');

  if (!currentUser) return null;

  async function handleSubmit() {
    const price = isFree ? null : parsePrice(priceText);

    if (!isFree && !priceText.trim()) return setError('Informe o valor por passageiro ou marque como gratuita.');
    if (price !== null && Number.isNaN(price)) return setError('Informe um valor válido, por exemplo 7,50.');

    const ride = await createRide({ destination, departureTime, totalCapacity: capacity, price });

    if (ride) {
      router.replace({ pathname: '/caronas/[rideId]', params: { rideId: ride.id } });
    }
  }

  return (
    <Screen showBack>
      <View style={styles.header}>
        <ThemedText type="subtitle">Oferecer carona</ThemedText>
        <ThemedText style={styles.description}>
          Saindo de <ThemedText type="smallBold">{currentUser.campus}</ThemedText>
          {currentVehicle ? ` no seu ${currentVehicle.model} ${currentVehicle.color.toLowerCase()}.` : '.'}
        </ThemedText>
      </View>

      <View style={styles.form}>
        <View style={styles.card}>
          <FormField
            label="Destino"
            value={destination}
            onChangeText={setDestination}
            placeholder="Bairro ou ponto de referência"
            autoCapitalize="words"
            maxLength={MAX_DESTINATION_LENGTH}
          />
          <FormField
            label="Horário de saída"
            value={departureTime}
            onChangeText={(value) => setDepartureTime(maskTime(value))}
            placeholder="18:00"
            keyboardType="number-pad"
            maxLength={5}
          />
          <Stepper
            label="Vagas para passageiros"
            value={capacity}
            min={1}
            max={maxSeats}
            onChange={setCapacity}
            hint={`Seu veículo comporta até ${maxSeats}.`}
          />
        </View>

        <View style={[styles.card, styles.priceSection]}>
          <ThemedText style={styles.priceLabel}>Valor por passageiro</ThemedText>
          <View style={styles.toggle}>
            <ToggleOption label="Paga" selected={!isFree} onPress={() => setIsFree(false)} />
            <ToggleOption label="Gratuita" selected={isFree} onPress={() => setIsFree(true)} />
          </View>
          {!isFree ? (
            <FormField
              label="Valor (R$)"
              value={priceText}
              onChangeText={setPriceText}
              placeholder="Ex.: 7,50"
              keyboardType="decimal-pad"
              hint={`Ajuda a dividir os custos. Máximo de R$ ${MAX_RIDE_PRICE}.`}
            />
          ) : null}
        </View>

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <AppButton label="Publicar carona" loadingLabel="Publicando..." isLoading={isSaving} onPress={handleSubmit} />
      </View>
    </Screen>
  );
}

function ToggleOption({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={styles.toggleOption}>
      <View style={[styles.toggleInner, selected && styles.toggleSelected]}>
        <ThemedText type="smallBold" style={[styles.toggleText, selected && styles.toggleSelectedText]}>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}
