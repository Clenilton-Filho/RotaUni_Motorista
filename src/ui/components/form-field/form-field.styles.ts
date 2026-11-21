import { StyleSheet } from 'react-native';

import { colors, spacing, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  field: { gap: spacing.xs },
  label: { ...ui.inputLabel, marginBottom: 0 },
  input: { ...ui.input },
  hint: { marginTop: 2 },
});

export const placeholderColor = colors.textMuted;
