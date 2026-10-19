import { View } from 'react-native';

import { MAX_VEHICLE_SEATS, type VehicleInput } from '@/core/domain/vehicle/vehicle.types';

import { FormField } from '@/ui/components/form-field/form-field';
import { Stepper } from '@/ui/components/stepper/stepper';

import { styles } from './vehicle-form-fields.styles';

type VehicleFormFieldsProps = {
  value: VehicleInput;
  onChange: (value: VehicleInput) => void;
};

export function VehicleFormFields({ value, onChange }: VehicleFormFieldsProps) {
  return (
    <View style={styles.fields}>
      <FormField
        label="Modelo"
        value={value.model}
        onChangeText={(model) => onChange({ ...value, model })}
        placeholder="Ex.: Honda Civic"
        autoCapitalize="words"
      />
      <FormField
        label="Cor"
        value={value.color}
        onChangeText={(color) => onChange({ ...value, color })}
        placeholder="Ex.: Prata"
        autoCapitalize="words"
      />
      <FormField
        label="Placa"
        value={value.plate}
        onChangeText={(plate) => onChange({ ...value, plate })}
        placeholder="ABC1D23"
        autoCapitalize="characters"
        maxLength={8}
      />
      <Stepper
        label="Lugares para passageiros"
        value={value.seats}
        min={1}
        max={MAX_VEHICLE_SEATS}
        onChange={(seats) => onChange({ ...value, seats })}
        hint="Sem contar o motorista."
      />
    </View>
  );
}

export const emptyVehicleInput: VehicleInput = { model: '', color: '', plate: '', seats: 4 };
