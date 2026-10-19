import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  card: { gap: 14, padding: 18, borderRadius: 10 },
  sectionTitle: { fontSize: 18, lineHeight: 24 },
  developmentSection: { gap: 10, padding: 16, borderRadius: 10, borderWidth: 1, borderColor: Palette.danger },
  developmentTitle: { color: Palette.danger, fontWeight: '700' },
});
