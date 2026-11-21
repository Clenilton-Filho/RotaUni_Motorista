import { Redirect, Stack } from 'expo-router';

import { useAppState } from '@/core/state/app-provider';

import { LoadingScreen } from '@/ui/components/loading-screen/loading-screen';

export default function AppLayout() {
  const { currentAccount, currentUser, isHydrated } = useAppState();

  if (!isHydrated) return <LoadingScreen />;
  if (!currentAccount || !currentUser) return <Redirect href="/boas-vindas" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
