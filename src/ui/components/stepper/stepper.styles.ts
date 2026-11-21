import { StyleSheet } from 'react-native';

import { colors, radius, spacing, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  field: { gap: spacing.xs },
  label: { ...ui.inputLabel, marginBottom: 0 },
  row: { ...ui.row, gap: spacing.md },
  button: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  pressed: { backgroundColor: colors.primaryDark },
  buttonText: { color: colors.textOnPrimary, fontSize: 22, lineHeight: 26, fontWeight: '700' },
  disabled: { opacity: 0.4 },
  value: {
    minWidth: 64,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueText: { fontSize: 18, lineHeight: 24, color: colors.text },
});
