import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Toast } from '@kevtucker/react-native-better-toast';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={() => Toast.success('Saved your settings successfully!')}
        >
          <Text style={styles.buttonLabel}>Success</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => Toast.error('Something went wrong')}
        >
          <Text style={styles.buttonLabel}>Error</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => Toast.info('Heads up, new sync available')}
        >
          <Text style={styles.buttonLabel}>Info</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => Toast.warning('Check your network connection')}
        >
          <Text style={styles.buttonLabel}>Warning</Text>
        </Pressable>
      </View>
      <Toast position="top" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6f8',
    paddingHorizontal: 16,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
