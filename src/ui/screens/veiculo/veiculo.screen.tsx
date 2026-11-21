import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { ValidationError } from '@/core/domain/auth/registration';
import { validateVehicleInput, type VehicleInput } from '@/core/domain/vehicle/vehicle.types';
import { useAppState } from '@/core/state/app-provider';

import { AppButton } from '@/ui/components/app-button/app-button';
import { Screen } from '@/ui/components/screen/screen';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { emptyVehicleInput, VehicleFormFields } from '@/ui/components/vehicle-form-fields/vehicle-form-fields';

import { styles } from './veiculo.styles';

export default function VehicleScreen() {
  const { currentVehicle, updateVehicle } = useAppState();
  const [vehicle, setVehicle] = useState<VehicleInput>(
    currentVehicle
      ? {
          model: currentVehicle.model,
          color: currentVehicle.color,
          plate: currentVehicle.plate,
          seats: currentVehicle.seats,
        }
      : emptyVehicleInput,
  );
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave() {
    const vehicleError = validateVehicleInput(vehicle);
    if (vehicleError) return setError(vehicleError);

    setIsSaving(true);
    setError('');

    try {
      await updateVehicle(vehicle);
      router.back();
    } catch (saveError) {
      setError(saveError instanceof ValidationError ? saveError.message : 'Não foi possível salvar o veículo.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Screen showBack>
      <View style={styles.header}>
        <ThemedText type="subtitle">Veículo</ThemedText>
        <ThemedText style={styles.description}>
          As alterações valem para as próximas caronas. Caronas já publicadas não mudam.
        </ThemedText>
      </View>

      <View style={styles.card}>
        <VehicleFormFields value={vehicle} onChange={setVehicle} />
      </View>

      {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

      <AppButton label="Salvar veículo" loadingLabel="Salvando..." isLoading={isSaving} onPress={handleSave} />
    </Screen>
  );
}
