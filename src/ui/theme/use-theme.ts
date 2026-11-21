import { Colors } from '@/ui/theme/theme';

/**
 * Cores dos componentes temáticos (ThemedText, ThemedView).
 * O design do app só tem modo claro; se um dia houver modo escuro,
 * é aqui que se volta a ler o `useColorScheme` do React Native.
 */
export function useTheme() {
  return Colors.light;
}
