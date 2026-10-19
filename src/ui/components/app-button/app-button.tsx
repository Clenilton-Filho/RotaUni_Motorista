import { Pressable } from 'react-native';

import { ThemedText } from '@/ui/components/themed-text/themed-text';

import { styles, textStyles } from './app-button.styles';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'success' | 'danger' | 'outline' | 'ghost-danger';
  disabled?: boolean;
  isLoading?: boolean;
  loadingLabel?: string;
  compact?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled,
  isLoading,
  loadingLabel,
  compact,
}: AppButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact && styles.compact,
        styles[variant],
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}>
      <ThemedText style={[styles.text, textStyles[variant]]}>
        {isLoading ? (loadingLabel ?? label) : label}
      </ThemedText>
    </Pressable>
  );
}
