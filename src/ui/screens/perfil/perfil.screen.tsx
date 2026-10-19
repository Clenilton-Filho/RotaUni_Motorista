import { useRouter } from 'expo-router';
import { useState } from 'react';

import { useAppState } from '@/core/state/app-provider';

import { AppButton } from '@/ui/components/app-button/app-button';
import { ConfirmDialog } from '@/ui/components/confirm-dialog/confirm-dialog';
import { InfoRow } from '@/ui/components/info-row/info-row';
import { Screen } from '@/ui/components/screen/screen';
import { ThemedText } from '@/ui/components/themed-text/themed-text';
import { ThemedView } from '@/ui/components/themed-view/themed-view';

import { styles } from './perfil.styles';

type PendingConfirmation = 'logout' | 'reset' | null;

export default function ProfileScreen() {
  const router = useRouter();
  const { currentAccount, currentUser, currentVehicle, logout, resetLocalData } = useAppState();
  const [confirmation, setConfirmation] = useState<PendingConfirmation>(null);
  const [isBusy, setIsBusy] = useState(false);

  if (!currentUser) return null;

  async function handleConfirm() {
    const pending = confirmation;
    setConfirmation(null);
    setIsBusy(true);

    try {
      if (pending === 'logout') await logout();
      if (pending === 'reset') await resetLocalData();
      router.replace('/login');
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <Screen showBack>
      <ThemedText type="subtitle">Perfil</ThemedText>

      <ThemedView type="backgroundElement" style={styles.card}>
        <InfoRow label="Nome" value={currentUser.name} />
        <InfoRow label="Faculdade" value={currentUser.university} />
        <InfoRow label="Campus" value={currentUser.campus} />
        <InfoRow label="Email" value={currentAccount?.email ?? ''} />
      </ThemedView>

      <ThemedText type="smallBold" style={styles.sectionTitle}>
        Veículo
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.card}>
        {currentVehicle ? (
          <>
            <InfoRow label="Modelo" value={`${currentVehicle.model} • ${currentVehicle.color}`} />
            <InfoRow label="Placa" value={currentVehicle.plate} />
            <InfoRow label="Lugares para passageiros" value={String(currentVehicle.seats)} />
          </>
        ) : (
          <ThemedText themeColor="textSecondary">Nenhum veículo cadastrado.</ThemedText>
        )}
        <AppButton
          compact
          variant="outline"
          label={currentVehicle ? 'Editar veículo' : 'Cadastrar veículo'}
          onPress={() => router.push('/veiculo')}
        />
      </ThemedView>

      <AppButton
        variant="ghost-danger"
        label="Sair da conta"
        loadingLabel="Saindo..."
        isLoading={isBusy}
        onPress={() => setConfirmation('logout')}
      />

      <ThemedView type="backgroundElement" style={styles.developmentSection}>
        <ThemedText style={styles.developmentTitle}>Desenvolvimento</ThemedText>
        <ThemedText themeColor="textSecondary">
          Ferramentas para limpar o estado local durante os testes.
        </ThemedText>
        <AppButton
          variant="danger"
          label="Resetar dados locais"
          disabled={isBusy}
          onPress={() => setConfirmation('reset')}
        />
      </ThemedView>

      <ConfirmDialog
        visible={confirmation === 'logout'}
        title="Sair da conta"
        message="Suas caronas e seu veículo continuam salvos neste aparelho."
        confirmLabel="Sair"
        destructive
        onCancel={() => setConfirmation(null)}
        onConfirm={handleConfirm}
      />
      <ConfirmDialog
        visible={confirmation === 'reset'}
        title="Resetar dados locais"
        message="Isso removerá contas, perfis, veículos, caronas e solicitações deste protótipo."
        confirmLabel="Resetar"
        destructive
        onCancel={() => setConfirmation(null)}
        onConfirm={handleConfirm}
      />
    </Screen>
  );
}
