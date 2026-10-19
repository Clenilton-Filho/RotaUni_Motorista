import { Redirect, Stack } from 'expo-router';

import { useAppState } from '@/core/state/app-provider';

export default function AppLayout() {
  const { currentAccount, currentUser, isHydrated } = useAppState();

  if (!isHydrated) return null;
  if (!currentAccount || !currentUser) return <Redirect href="/boas-vindas" />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
