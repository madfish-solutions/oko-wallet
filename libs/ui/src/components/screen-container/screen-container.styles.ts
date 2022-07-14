import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: isWeb ? '100vh' : '100%',
    backgroundColor: colors.bgGrey1,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  qrCodeWrapper: {
    position: 'relative',
    marginBottom: getCustomSize(2),
    paddingBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    backgroundColor: colors.bgGrey2,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  layout: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '100%',
    height: 600,
    backgroundColor: colors.bgGrey2
  },
  container: {
    marginTop: getCustomSize(-6),
    paddingTop: getCustomSize(6)
  },
  content: {
    marginTop: getCustomSize(-6),
    paddingTop: getCustomSize(6),
    padding: getCustomSize(2),
    backgroundColor: colors.bgGrey1,
    zIndex: -1
  }
});
