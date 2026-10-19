import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { isValidEmail, normalizeEmail } from '@/core/domain/auth/email';
import { useAppState } from '@/core/state/app-provider';

import { AppButton } from '@/ui/components/app-button/app-button';
import { FormField } from '@/ui/components/form-field/form-field';
import { Screen } from '@/ui/components/screen/screen';
import { ThemedText } from '@/ui/components/themed-text/themed-text';

import { styles } from './login.styles';

export default function LoginScreen() {
  const { login } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) return setError('Preencha email e senha.');
    if (!isValidEmail(normalizedEmail)) return setError('Informe um email válido.');

    setIsSubmitting(true);
    setError('');

    try {
      const authenticated = await login(normalizedEmail, password);
      if (!authenticated) setError('Email ou senha inválidos.');
    } catch {
      setError('Não foi possível entrar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <ThemedText style={styles.brand}>RotaUni Motorista</ThemedText>
        <ThemedText type="title">Entrar</ThemedText>
        <ThemedText themeColor="textSecondary">
          Acesse sua conta para oferecer caronas aos universitários.
        </ThemedText>
      </View>

      <View style={styles.form}>
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
        />
        <FormField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Sua senha"
          secureTextEntry
        />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        <AppButton label="Entrar" loadingLabel="Entrando..." isLoading={isSubmitting} onPress={handleLogin} />
        <Link href="/cadastro" asChild>
          <Pressable>
            <ThemedText type="linkPrimary">Quero ser motorista: criar conta</ThemedText>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
