import { ActivityIndicator, View } from 'react-native';

import { indicatorColor, styles } from './loading-screen.styles';

/**
 * Tela de espera enquanto o app lê os dados salvos (sessão, perfil, veículo).
 * No celular a splash cobre esse momento; na web, evita a tela em branco.
 */
export function LoadingScreen() {
  return (
    <View style={styles.container} accessibilityLabel="Carregando" accessibilityRole="progressbar">
      <ActivityIndicator size="large" color={indicatorColor} />
    </View>
  );
}
