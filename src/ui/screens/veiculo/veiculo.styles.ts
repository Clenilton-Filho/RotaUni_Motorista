import { StyleSheet } from 'react-native';

import { colors, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: spacing.sm },
  description: { ...typography.body, color: colors.textMuted },
  card: { ...ui.card, padding: spacing.lg, marginBottom: 0 },
  error: { color: colors.danger, fontWeight: '600' },
});
