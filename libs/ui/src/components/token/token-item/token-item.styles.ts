import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between'
  },
  rootPrimary: {
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(0.5),
    padding: getCustomSize(1),
    marginBottom: getCustomSize(0.25)
  },
  rootSecondary: {
    backgroundColor: 'transparent',
    borderTopWidth: getCustomSize(0.0625),
    borderColor: colors.border2,
    paddingVertical: getCustomSize(2)
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
  tokenNameContainer: {
    maxWidth: getCustomSize(16)
  },
  text: {
    color: colors.textGrey1
  },
  textPrimary: {
    ...typography.numbersIBMPlexSansMediumUppercase13
  },
  textSecondary: {
    ...typography.numbersIBMPlexSansMedium15
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
