import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: 12, marginTop: 24 },
  brand: { color: Palette.primary, fontWeight: '700' },
  form: { gap: 20 },
  error: { color: Palette.danger },
});
