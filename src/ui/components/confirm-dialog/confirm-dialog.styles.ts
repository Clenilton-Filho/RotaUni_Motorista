import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  dialog: { gap: 14, padding: 20, borderRadius: 12, maxWidth: 480, width: '100%', alignSelf: 'center' },
  title: { fontSize: 18, lineHeight: 24 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 6 },
});
