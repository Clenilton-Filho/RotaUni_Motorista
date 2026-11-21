import { StyleSheet } from 'react-native';

import { spacing, typography } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  row: { gap: spacing.xs },
  label: { ...typography.caption, fontWeight: '600' },
  value: { ...typography.body, fontWeight: '600' },
});
