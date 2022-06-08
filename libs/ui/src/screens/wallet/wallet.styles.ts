import { StyleSheet, Platform } from 'react-native';

export const WalletStyles = StyleSheet.create({
  root: {
    height: Platform.OS === 'web' ? '100vh' : '100%'
  }
});
