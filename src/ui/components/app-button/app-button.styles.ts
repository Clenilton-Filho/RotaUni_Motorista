import { StyleSheet } from 'react-native';

import { colors, radius, shadow, spacing, typography, ui } from '@/ui/theme/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  compact: { paddingVertical: 10, paddingHorizontal: spacing.md },
  // Laranja: a ação principal da tela.
  primary: { ...ui.buttonPrimary },
  success: { backgroundColor: colors.success, ...shadow },
  danger: { backgroundColor: colors.danger },
  // Contorno azul: ações de apoio.
  outline: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.primary },
  'ghost-danger': {},
  disabled: { opacity: 0.5 },
  text: { ...typography.button },
});

// Cor de fundo quando o botão está pressionado.
export const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: colors.accentDark },
  success: { opacity: 0.85 },
  danger: { opacity: 0.85 },
  outline: { backgroundColor: colors.primarySoft },
  'ghost-danger': { backgroundColor: colors.dangerSoft },
});

export const textStyles = StyleSheet.create({
  primary: { color: colors.textOnPrimary },
  success: { color: colors.textOnPrimary },
  danger: { color: colors.textOnPrimary },
  outline: { color: colors.primary },
  'ghost-danger': { color: colors.danger },
});
