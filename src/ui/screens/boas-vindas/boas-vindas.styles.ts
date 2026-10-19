import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  content: { flex: 1, justifyContent: 'center', gap: 32 },
  hero: { alignItems: 'center', gap: 12 },
  logoCircle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 64, height: 64 },
  brand: { color: Palette.primary, fontWeight: '700' },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center' },
  benefits: { gap: 12 },
  benefit: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, borderRadius: 12 },
  benefitIcon: { fontSize: 26, lineHeight: 32 },
  benefitText: { flex: 1, gap: 2 },
  actions: { gap: 12 },
});
