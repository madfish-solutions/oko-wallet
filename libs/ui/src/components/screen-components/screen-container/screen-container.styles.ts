import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { EXTENSION_FULL_SIZE } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: isWeb ? EXTENSION_FULL_SIZE : '100%',
    backgroundColor: colors.navGrey1
  }
});
