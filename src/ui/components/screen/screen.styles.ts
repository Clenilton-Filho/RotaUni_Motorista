import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: spacing.lg, gap: spacing.lg },
  back: { alignSelf: 'flex-start', paddingVertical: spacing.xs },
  backText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
});
