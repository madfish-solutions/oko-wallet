import { StyleSheet } from 'react-native';

import { isWeb } from '../../utils/platform.utils';

export const WalletStyles = StyleSheet.create({
  root: {
    height: isWeb ? '100vh' : '100%'
  }
});
