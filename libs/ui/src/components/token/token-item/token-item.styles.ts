import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    borderRadius: getCustomSize(0.5),
    marginBottom: getCustomSize(0.25),
    padding: getCustomSize(1)
  },
  rootPrimary: {
    backgroundColor: colors.navGrey1
  },
  rootSecondary: {
    backgroundColor: 'transparent',
    borderTopWidth: getCustomSize(0.0625),
    borderColor: colors.border2,
    paddingLeft: 0
  },
  token: {
    width: 'auto'
  },
  image: {
    borderColor: colors.bgGrey3,
    borderWidth: getCustomSize(0.25),
    borderRadius: getCustomSize(8),
    marginRight: getCustomSize(0.5)
  },
  imagePrimary: {
    width: getCustomSize(3),
    height: getCustomSize(3)
  },
  imageSecondary: {
    width: getCustomSize(4),
    height: getCustomSize(4)
  },
  text: {
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansMediumUppercase13
  },
  tokenName: {
    color: colors.textGrey1,
    ...typography.captionInterRegular11
  },
  rightSideContainer: {
    alignItems: 'flex-end'
  },
  usdBalance: {
    color: colors.textGrey1,
    marginTop: getCustomSize(0.25),
    ...typography.numbersIBMPlexSansMedium11
  },
  usdSymbol: {
    color: colors.textGrey3
  }
});
