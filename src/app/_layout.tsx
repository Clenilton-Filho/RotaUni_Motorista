import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppProvider } from '@/core/state/app-provider';

import { SplashOverlay } from '@/ui/components/splash-overlay/splash-overlay';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <AppProvider>
          <SplashOverlay />
          <Stack screenOptions={{ headerShown: false }} />
        </AppProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
