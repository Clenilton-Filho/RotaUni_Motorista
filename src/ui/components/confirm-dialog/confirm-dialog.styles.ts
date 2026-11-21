import { StyleSheet } from 'react-native';

import { colors, radius, shadow, spacing, typography } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backdrop,
  },
  dialog: {
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
    ...shadow,
  },
  title: { ...typography.subtitle },
  message: { ...typography.body, color: colors.textMuted },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.sm, marginTop: spacing.xs },
});
