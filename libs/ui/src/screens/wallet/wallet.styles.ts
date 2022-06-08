import { isWeb } from '@rnw-community/platform';
import { StyleSheet } from 'react-native';

export const WalletStyles = StyleSheet.create({
  root: {
    height: isWeb ? '100vh' : '100%'
  }
});
