import { StyleSheet } from 'react-native';

import { colors } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

export const indicatorColor = colors.primary;
