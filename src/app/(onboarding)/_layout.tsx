import { Redirect, Stack } from 'expo-router';

import { useAppState } from '@/core/state/app-provider';

import { LoadingScreen } from '@/ui/components/loading-screen/loading-screen';

export default function OnboardingLayout() {
  const { currentAccount, currentUser, isHydrated } = useAppState();

  if (!isHydrated) return <LoadingScreen />;
  if (currentAccount && currentUser) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
