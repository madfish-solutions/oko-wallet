import { StyleSheet } from 'react-native';
import { isWeb } from 'shelter/src/utils/platform.utils';

import { getCustomSize } from '../../../../styles/format-size';

export const styles = StyleSheet.create({
  root: {
    width: getCustomSize(isWeb ? 6.6 : 6.975),
    height: getCustomSize(5),
    alignItems: 'center',
    justifyContent: 'center'
  }
});
