import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: 12, marginTop: 8 },
  brand: { color: Palette.primary, fontWeight: '700' },
  form: { gap: 20 },
  sectionTitle: { fontSize: 18, lineHeight: 24, marginTop: 8 },
  error: { color: Palette.danger },
});
