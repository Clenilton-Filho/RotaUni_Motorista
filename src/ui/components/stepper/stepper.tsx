import { Pressable, View } from 'react-native';

import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';

import { styles } from './stepper.styles';

type StepperProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  hint?: string;
};

export function Stepper({ label, value, min, max, onChange, hint }: StepperProps) {
  return (
    <View style={styles.field}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.row}>
        <StepButton symbol="−" disabled={value <= min} onPress={() => onChange(value - 1)} label="Diminuir" />
        <ThemedView type="backgroundElement" style={styles.value}>
          <ThemedText type="smallBold" style={styles.valueText}>
            {value}
          </ThemedText>
        </ThemedView>
        <StepButton symbol="+" disabled={value >= max} onPress={() => onChange(value + 1)} label="Aumentar" />
      </View>
      {hint ? (
        <ThemedText type="small" themeColor="textSecondary">
          {hint}
        </ThemedText>
      ) : null}
    </View>
  );
}

type StepButtonProps = { symbol: string; label: string; disabled: boolean; onPress: () => void };

function StepButton({ symbol, label, disabled, onPress }: StepButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}>
      <ThemedText style={styles.buttonText}>{symbol}</ThemedText>
    </Pressable>
  );
}
