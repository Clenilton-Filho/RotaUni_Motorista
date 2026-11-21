import { StyleSheet } from 'react-native';

import { colors, radius, shadow, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  // Cabeçalho azul (ui.header) como um cartão arredondado.
  header: {
    ...ui.header,
    paddingTop: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.xs,
    ...shadow,
  },
  headerTitle: { ...ui.headerTitle },
  headerSubtitle: { ...ui.headerSubtitle },
  campus: { ...typography.subtitle, color: colors.textOnPrimary },
  headerActions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  headerLink: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  headerLinkPressed: { backgroundColor: 'rgba(255, 255, 255, 0.28)' },
  headerLinkText: { color: colors.textOnPrimary, fontSize: 14, lineHeight: 20, fontWeight: '700' },

  stats: { flexDirection: 'row', gap: spacing.sm },
  statTile: { ...ui.card, flex: 1, gap: 2, paddingVertical: spacing.md, paddingHorizontal: spacing.sm, marginBottom: 0, borderRadius: radius.md },
  statValue: { ...typography.subtitle, color: colors.primary },
  statLabel: { ...typography.caption, fontSize: 12, lineHeight: 16 },

  warning: {
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.warning,
    backgroundColor: colors.warningSoft,
  },
  warningText: { ...typography.body, fontWeight: '700' },

  sectionTitle: { ...typography.title, fontSize: 20, lineHeight: 28 },
  ridesList: { gap: spacing.md },
  feedback: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xl },
  empty: { ...ui.card, marginBottom: 0, alignItems: 'center' },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
  error: { color: colors.danger },
});
