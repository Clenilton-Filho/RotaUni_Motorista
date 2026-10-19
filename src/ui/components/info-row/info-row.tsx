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
      <ThemedText type="smallBold">{label}</ThemedText>
      <ThemedText>{value}</ThemedText>
    </View>
  );
}
