import { TextInput, View, type TextInputProps } from 'react-native';

import { ThemedText } from '@/ui/components/themed-text/themed-text';

import { styles } from './form-field.styles';

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
      <ThemedText type="smallBold">{label}</ThemedText>
      <TextInput
        {...inputProps}
        autoCapitalize={autoCapitalize}
        placeholderTextColor="#737373"
        style={styles.input}
      />
      {hint ? (
        <ThemedText type="small" themeColor="textSecondary">
          {hint}
        </ThemedText>
      ) : null}
    </View>
  );
}
