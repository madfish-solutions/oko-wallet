import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../../styles/format-size';
import { checkActiveApplicationSession } from '../../../utils/check-active-application-session.util';
import { isWeb } from '../../../utils/platform.utils';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: isWeb ? EXTENSION_FULL_SIZE : '100%',
    backgroundColor: colors.navGrey1,
    ...(isMaximiseScreenOpened && { borderWidth: getCustomSize(0.125), borderColor: colors.bgGrey2 })
  }
});
