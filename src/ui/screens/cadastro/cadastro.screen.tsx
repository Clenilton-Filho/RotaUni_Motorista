import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { testDriver } from '@/core/data/test-driver';
import { isValidEmail, normalizeEmail } from '@/core/domain/auth/email';
import { validateVehicleInput, type VehicleInput } from '@/core/domain/vehicle/vehicle.types';
import { useAppState } from '@/core/state/app-provider';

import { AppButton } from '@/ui/components/app-button/app-button';
import { FormField } from '@/ui/components/form-field/form-field';
import { Screen } from '@/ui/components/screen/screen';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { emptyVehicleInput, VehicleFormFields } from '@/ui/components/vehicle-form-fields/vehicle-form-fields';

import { styles } from './cadastro.styles';

export default function CadastroScreen() {
  const router = useRouter();
  const { register } = useAppState();
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [campus, setCampus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [vehicle, setVehicle] = useState<VehicleInput>(emptyVehicleInput);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function fillWithTestData() {
    setName(testDriver.profile.name);
    setUniversity(testDriver.profile.university);
    setCampus(testDriver.profile.campus);
    setEmail(testDriver.email);
    setPassword(testDriver.password);
    setPasswordConfirmation(testDriver.password);
    setVehicle(testDriver.vehicle);
    setError('');
  }

  async function handleSubmit() {
    const values = [name, university, campus].map((value) => value.trim());
    const normalizedEmail = normalizeEmail(email);

    if (values.some((value) => value.length === 0) || !normalizedEmail || !password || !passwordConfirmation) {
      return setError('Preencha todos os seus dados.');
    }
    if (!isValidEmail(normalizedEmail)) return setError('Informe um email válido.');
    if (password.length < 8) return setError('A senha deve ter pelo menos 8 caracteres.');
    if (password !== passwordConfirmation) return setError('As senhas não conferem.');

    const vehicleError = validateVehicleInput(vehicle);
    if (vehicleError) return setError(vehicleError);

    setIsSubmitting(true);
    setError('');

    try {
      await register(
        { email: normalizedEmail, password },
        { name: values[0], university: values[1], campus: values[2] },
        vehicle,
      );
      router.replace('/login');
    } catch (registrationError) {
      setError(
        registrationError instanceof Error && registrationError.message === 'EMAIL_ALREADY_EXISTS'
          ? 'Este email já está cadastrado.'
          : 'Não foi possível criar a conta.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Screen>
      <View style={styles.header}>
        <ThemedText style={styles.brand}>RotaUni Motorista</ThemedText>
        <ThemedText type="subtitle">Ofereça caronas</ThemedText>
        <ThemedText themeColor="textSecondary">
          Crie seu perfil de motorista e leve outros universitários pelo seu caminho.
        </ThemedText>
      </View>

      {__DEV__ ? (
        <AppButton compact variant="outline" label="Preencher com dados de teste" onPress={fillWithTestData} />
      ) : null}

      <View style={styles.form}>
        <ThemedText type="smallBold" style={styles.sectionTitle}>
          Seus dados
        </ThemedText>
        <FormField label="Nome" value={name} onChangeText={setName} placeholder="Seu nome" autoCapitalize="words" />
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
          placeholder="Mínimo de 8 caracteres"
          secureTextEntry
        />
        <FormField
          label="Confirmar senha"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Repita sua senha"
          secureTextEntry
        />
        <FormField
          label="Faculdade"
          value={university}
          onChangeText={setUniversity}
          placeholder="Nome da faculdade"
          autoCapitalize="words"
        />
        <FormField
          label="Campus"
          value={campus}
          onChangeText={setCampus}
          placeholder="De onde suas caronas saem"
          autoCapitalize="words"
        />

        <ThemedText type="smallBold" style={styles.sectionTitle}>
          Seu veículo
        </ThemedText>
        <VehicleFormFields value={vehicle} onChange={setVehicle} />

        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}

        <AppButton label="Criar conta" loadingLabel="Criando..." isLoading={isSubmitting} onPress={handleSubmit} />
        <Link href="/login" asChild>
          <Pressable>
            <ThemedText type="linkPrimary">Já tenho uma conta</ThemedText>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
