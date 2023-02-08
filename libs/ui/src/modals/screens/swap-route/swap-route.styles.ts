import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';
import { isMobile } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: getCustomSize(2),
    paddingBottom: getCustomSize(isMobile ? 4 : 2),
    justifyContent: 'space-between'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    marginBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(2)
  },
  fromToken: {
    marginBottom: getCustomSize(),
    justifyContent: 'space-between'
  },
  toToken: {
    marginTop: getCustomSize(),
    justifyContent: 'space-between'
  },
  triangle: {
    width: 0,
    height: 0,
    borderTopWidth: getCustomSize(0.75),
    borderRightWidth: 0,
    borderBottomWidth: getCustomSize(0.75),
    borderLeftWidth: getCustomSize(1.5),
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: colors.red,
    marginRight: getCustomSize()
  },
  destination: {
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  button: {
    paddingHorizontal: getCustomSize(2)
  }
});
