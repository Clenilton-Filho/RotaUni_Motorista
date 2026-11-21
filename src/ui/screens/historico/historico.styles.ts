import { StyleSheet } from 'react-native';

import { colors, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  list: { gap: spacing.md },
  feedback: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  empty: { ...ui.card, marginBottom: 0, alignItems: 'center' },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  error: { color: colors.danger, fontWeight: '600' },
});
