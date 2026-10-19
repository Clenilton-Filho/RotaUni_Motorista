import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  content: { flex: 1, gap: 14, alignItems: 'center', justifyContent: 'center', paddingVertical: 24 },
  check: { color: Palette.success, fontSize: 64, lineHeight: 72, fontWeight: '700' },
  title: { textAlign: 'center' },
  centered: { textAlign: 'center' },
  card: { gap: 14, padding: 18, borderRadius: 10, alignSelf: 'stretch' },
  actions: { gap: 10 },
});
