import { StyleSheet } from 'react-native';

import { colors, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: spacing.sm, alignItems: 'flex-start' },
  title: { fontSize: 26, lineHeight: 34 },
  time: { ...typography.body, color: colors.textMuted },
  card: { ...ui.card, gap: spacing.md, padding: spacing.lg, marginBottom: 0 },
  section: { gap: spacing.md },
  sectionTitle: { ...typography.subtitle },
  emptyText: { ...typography.body, color: colors.textMuted },
  actions: { gap: spacing.sm },
  hint: { ...typography.caption },
  feedback: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  error: { color: colors.danger, fontWeight: '600' },
});
