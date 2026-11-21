import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  content: { flex: 1, gap: spacing.md, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.lg },
  checkCircle: {
    width: 104,
    height: 104,
    borderRadius: radius.pill,
    backgroundColor: colors.successSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  check: { color: colors.success, fontSize: 56, lineHeight: 64, fontWeight: '700' },
  title: { textAlign: 'center' },
  centered: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  card: { ...ui.card, gap: spacing.md, padding: spacing.lg, marginBottom: 0, marginTop: spacing.sm, alignSelf: 'stretch' },
  actions: { gap: spacing.md },
});
