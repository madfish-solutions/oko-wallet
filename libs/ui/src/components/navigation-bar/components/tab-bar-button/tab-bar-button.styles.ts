import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { isWeb } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    width: getCustomSize(isWeb ? 6.6 : 6.975),
    height: getCustomSize(5),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
