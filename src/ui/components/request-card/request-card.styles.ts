import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  card: { gap: 12, padding: 16, borderRadius: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  info: { flex: 1, gap: 2 },
  rating: { color: Palette.star, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: 10 },
  action: { flex: 1 },
  accepted: { color: Palette.success, fontWeight: '700' },
  rejected: { color: Palette.danger, fontWeight: '700' },
});
