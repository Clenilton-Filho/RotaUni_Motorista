import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: 8 },
  form: { gap: 20 },
  priceSection: { gap: 12 },
  toggle: { flexDirection: 'row', gap: 10 },
  toggleOption: { flex: 1 },
  toggleInner: { alignItems: 'center', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: 'transparent' },
  toggleSelected: { borderColor: Palette.primary },
  toggleSelectedText: { color: Palette.primary },
  error: { color: Palette.danger },
});
