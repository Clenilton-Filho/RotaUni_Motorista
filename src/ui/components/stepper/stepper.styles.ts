import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  field: { gap: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  button: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.primary,
  },
  buttonText: { color: Palette.white, fontSize: 22, lineHeight: 26, fontWeight: '700' },
  disabled: { opacity: 0.4 },
  value: { minWidth: 64, height: 44, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  valueText: { fontSize: 18 },
});
