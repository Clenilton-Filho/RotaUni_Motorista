import { StyleSheet } from 'react-native';

import { Palette } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  image: { width: 76, height: 76 },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});
