import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  button: { alignItems: 'center', borderRadius: 8, padding: 15 },
  compact: { paddingVertical: 9, paddingHorizontal: 16 },
  primary: { backgroundColor: Palette.primary },
  success: { backgroundColor: Palette.success },
  danger: { backgroundColor: Palette.danger },
  outline: { borderWidth: 1, borderColor: Palette.primary },
  'ghost-danger': {},
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  text: { fontWeight: '700' },
});

export const textStyles = StyleSheet.create({
  primary: { color: Palette.white },
  success: { color: Palette.white },
  danger: { color: Palette.white },
  outline: { color: Palette.primary },
  'ghost-danger': { color: Palette.danger },
});
