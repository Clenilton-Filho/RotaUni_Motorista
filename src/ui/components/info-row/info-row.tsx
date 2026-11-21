import { View } from 'react-native';

import { ThemedText } from '@/ui/components/themed-text/themed-text';

import { styles } from './info-row.styles';

type InfoRowProps = {
  label: string;
  value: string;
};

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  );
}
