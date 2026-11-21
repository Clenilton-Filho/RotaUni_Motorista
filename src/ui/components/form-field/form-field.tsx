import { TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/ui/components/themed-text/themed-text';

import { placeholderColor, styles } from './form-field.styles';

type FormFieldProps = Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'placeholder' | 'secureTextEntry' | 'keyboardType' | 'autoCapitalize' | 'maxLength'
> & {
  label: string;
  hint?: string;
};

export function FormField({ label, hint, autoCapitalize = 'none', ...inputProps }: FormFieldProps) {
  return (
    <View style={styles.field}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        {...inputProps}
        autoCapitalize={autoCapitalize}
        placeholderTextColor={placeholderColor}
        style={styles.input}
      />
      {hint ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.hint}>
          {hint}
        </ThemedText>
      ) : null}
    </View>
  );
}
