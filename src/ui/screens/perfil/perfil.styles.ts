import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  card: { ...ui.card, gap: spacing.md, padding: spacing.lg, marginBottom: 0 },
  sectionTitle: { ...typography.subtitle },
  developmentSection: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  developmentTitle: { color: colors.danger, fontWeight: '700' },
  developmentText: { ...typography.caption },
  error: { color: colors.danger, fontWeight: '600', textAlign: 'center' },
});
