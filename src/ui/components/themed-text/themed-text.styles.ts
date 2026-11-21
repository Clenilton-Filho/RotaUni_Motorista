import { Platform, StyleSheet } from 'react-native';

import { colors, Fonts } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  small: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: 400,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: 400,
  },
  // Título grande de tela de entrada (login).
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 700,
  },
  // Título de cada tela (Histórico, Perfil...).
  subtitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 700,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 15,
    fontWeight: 700,
    color: colors.primary,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
