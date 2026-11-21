import { router } from 'expo-router';
import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';

import { styles } from './screen.styles';

type ScreenProps = PropsWithChildren<{
  showBack?: boolean;
}>;

/**
 * Estrutura comum das telas: área segura, teclado e rolagem.
 */
export function Screen({ children, showBack }: ScreenProps) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled">
            {showBack ? (
              <Pressable
                accessibilityRole="button"
                style={styles.back}
                onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
                <ThemedText style={styles.backText}>‹ Voltar</ThemedText>
              </Pressable>
            ) : null}
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
