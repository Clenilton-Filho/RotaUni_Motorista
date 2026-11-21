import { StyleSheet } from 'react-native';

import { colors, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: spacing.sm, marginTop: spacing.lg },
  brand: { color: colors.primary, fontWeight: '700', letterSpacing: 0.5 },
  description: { ...typography.body, color: colors.textMuted },
  form: { ...ui.card, gap: spacing.md, padding: spacing.lg, marginBottom: 0 },
  link: { alignSelf: 'center' },
  error: { color: colors.danger, fontWeight: '600' },
});
