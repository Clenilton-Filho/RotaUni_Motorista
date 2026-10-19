import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Na web não há splash nativa para animar.
export function SplashOverlay() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return null;
}
