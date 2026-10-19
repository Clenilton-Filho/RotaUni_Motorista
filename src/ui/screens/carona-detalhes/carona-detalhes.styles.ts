import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: 8, alignItems: 'flex-start' },
  title: { fontSize: 26, lineHeight: 34 },
  card: { gap: 14, padding: 18, borderRadius: 10 },
  section: { gap: 12 },
  sectionTitle: { fontSize: 18, lineHeight: 24 },
  actions: { gap: 8 },
  feedback: { alignItems: 'center', gap: 12, paddingVertical: 32 },
  error: { color: Palette.danger },
});
