import { Redirect, Stack } from 'expo-router';

import { useAppState } from '@/core/state/app-provider';

export default function OnboardingLayout() {
  const { currentAccount, currentUser, isHydrated } = useAppState();

  if (!isHydrated) return null;
  if (currentAccount && currentUser) return <Redirect href="/" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
