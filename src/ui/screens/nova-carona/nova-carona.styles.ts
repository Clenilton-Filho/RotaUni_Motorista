import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: spacing.sm },
  description: { ...typography.body, color: colors.textMuted },
  form: { gap: spacing.lg },
  card: { ...ui.card, gap: spacing.md, padding: spacing.lg, marginBottom: 0 },
  priceSection: { gap: spacing.md },
  priceLabel: { ...ui.inputLabel, marginBottom: 0 },
  toggle: { flexDirection: 'row', gap: spacing.sm },
  toggleOption: { flex: 1 },
  toggleInner: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  toggleSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  toggleText: { color: colors.textMuted },
  toggleSelectedText: { color: colors.primary },
  error: { color: colors.danger, fontWeight: '600' },
});
