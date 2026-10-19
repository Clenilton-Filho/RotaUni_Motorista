import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  list: { gap: 14 },
  feedback: { alignItems: 'center', gap: 12, paddingVertical: 32 },
  error: { color: Palette.danger },
});
