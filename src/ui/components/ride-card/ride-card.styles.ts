import { StyleSheet } from 'react-native';

import { colors, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  card: { ...ui.card, gap: spacing.md, marginBottom: 0 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: spacing.md },
  title: { flex: 1, gap: 2 },
  route: { ...typography.subtitle },
  time: { ...typography.caption },
  divider: { ...ui.divider, marginVertical: 0 },
  details: { ...ui.row, justifyContent: 'space-between' },
  passengers: { ...typography.body, color: colors.textMuted },
  price: { ...typography.subtitle, color: colors.primary },
  footer: { ...typography.caption },
});
