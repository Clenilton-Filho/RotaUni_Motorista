import { StyleSheet } from 'react-native';

import { colors, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: spacing.sm, marginTop: spacing.sm },
  brand: { color: colors.primary, fontWeight: '700', letterSpacing: 0.5 },
  description: { ...typography.body, color: colors.textMuted },
  form: { gap: spacing.lg },
  section: { ...ui.card, gap: spacing.md, padding: spacing.lg, marginBottom: 0 },
  sectionTitle: { ...typography.subtitle, color: colors.primary },
  link: { alignSelf: 'center' },
  error: { color: colors.danger, fontWeight: '600' },
});
