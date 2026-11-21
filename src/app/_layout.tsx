import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from '@/core/state/app-provider';

import { SplashOverlay } from '@/ui/components/splash-overlay/splash-overlay';
import { colors } from '@/ui/theme/theme';

SplashScreen.preventAutoHideAsync();

// O design do app só tem modo claro (azul e branco).
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <SafeAreaProvider>
        <AppProvider>
          <SplashOverlay />
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
        </AppProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
