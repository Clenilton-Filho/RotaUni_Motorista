import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  header: { gap: 6 },
  headerActions: { flexDirection: 'row', gap: 18, marginTop: 8 },
  stats: { flexDirection: 'row', gap: 10 },
  statTile: { flex: 1, gap: 2, padding: 12, borderRadius: 10 },
  statValue: { fontSize: 18, lineHeight: 24 },
  warning: { gap: 12, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: Palette.danger },
  warningText: { color: Palette.danger, fontWeight: '700' },
  sectionTitle: { fontSize: 24, lineHeight: 32 },
  ridesList: { gap: 14 },
  feedback: { alignItems: 'center', gap: 12, paddingVertical: 32 },
  error: { color: Palette.danger },
});
