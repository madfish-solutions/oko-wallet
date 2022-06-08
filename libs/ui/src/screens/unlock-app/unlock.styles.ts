import { isWeb } from '@rnw-community/platform';
import { StyleSheet } from 'react-native';

export const UnlockStyles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  text: {
    fontSize: 24,
    fontWeight: '700'
  },
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFF',
    height: isWeb ? '100vh' : '100%'
  }
});
