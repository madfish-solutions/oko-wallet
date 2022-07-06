import { FontsEnum } from '../interfaces/fonts.enum';
import { Typography } from '../interfaces/typography.interface';

import { getCustomSize } from './format-size';

export const typography: Typography = {
  headlineInterBold34: {
    fontFamily: FontsEnum.interBold,
    fontSize: getCustomSize(4.25),
    lineHeight: getCustomSize(5.125),
    letterSpacing: getCustomSize(0.05125)
  },
  headlineInterBold28: {
    fontFamily: FontsEnum.interBold,
    fontSize: getCustomSize(3.5),
    lineHeight: getCustomSize(4.25),
    letterSpacing: getCustomSize(0.0422)
  },
  headlineInterBold22: {
    fontFamily: FontsEnum.interBold,
    fontSize: getCustomSize(2.75),
    lineHeight: getCustomSize(3.5),
    letterSpacing: getCustomSize(0.043)
  },
  headlineInterRegular22: {
    fontFamily: FontsEnum.interRegular,
    fontSize: getCustomSize(2.75),
    lineHeight: getCustomSize(3.5),
    letterSpacing: getCustomSize(0.043)
  },
  bodyInterSemiBold17: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(2.125),
    lineHeight: getCustomSize(2.275),
    letterSpacing: getCustomSize(-0.05125)
  },
  bodyInterRegular17: {
    fontFamily: FontsEnum.interRegular,
    fontSize: getCustomSize(2.125),
    lineHeight: getCustomSize(2.275),
    letterSpacing: getCustomSize(-0.05125)
  },
  bodyInterSemiBold15: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.875),
    lineHeight: getCustomSize(2.5),
    letterSpacing: getCustomSize(-0.03)
  },
  bodyInterRegular15: {
    fontFamily: FontsEnum.interRegular,
    fontSize: getCustomSize(1.875),
    lineHeight: getCustomSize(2.5),
    letterSpacing: getCustomSize(-0.03)
  },
  taglineInterSemiBoldUppercase15: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.875),
    textTransform: 'uppercase',
    lineHeight: getCustomSize(2.5),
    letterSpacing: getCustomSize(-0.03)
  },
  taglineInterSemiBoldUppercase13: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.625),
    textTransform: 'uppercase',
    lineHeight: getCustomSize(2.25),
    letterSpacing: getCustomSize(-0.01)
  },
  taglineInterSemiBoldUppercase11: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.375),
    textTransform: 'uppercase',
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  captionInterSemiBold13: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.625),
    lineHeight: getCustomSize(2.25),
    letterSpacing: getCustomSize(-0.01)
  },
  captionInterRegular13: {
    fontFamily: FontsEnum.interRegular,
    fontSize: getCustomSize(1.625),
    lineHeight: getCustomSize(2.25),
    letterSpacing: getCustomSize(-0.01)
  },
  captionInterSemiBoldUnderline13: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.625),
    textDecorationLine: 'underline',
    lineHeight: getCustomSize(2.25),
    letterSpacing: getCustomSize(-0.01)
  },
  captionInterSemiBold11: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.375),
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  captionInterRegular11: {
    fontFamily: FontsEnum.interRegular,
    fontSize: getCustomSize(1.375),
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  captionInterRegularUppercase11: {
    fontFamily: FontsEnum.interRegular,
    fontSize: getCustomSize(1.375),
    textTransform: 'uppercase',
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  captionInterSemiBoldUnderline11: {
    fontFamily: FontsEnum.interSemiBold,
    fontSize: getCustomSize(1.375),
    textDecorationLine: 'underline',
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  numbersIBMPlexSansBold34: {
    fontFamily: FontsEnum.ibmPlexSansBold,
    fontSize: getCustomSize(4.25),
    lineHeight: getCustomSize(5.125),
    letterSpacing: getCustomSize(0.05125)
  },
  numbersIBMPlexSansMedium28: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(3.5),
    lineHeight: getCustomSize(4.25),
    letterSpacing: getCustomSize(0.0422)
  },
  numbersIBMPlexSansMedium22: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(2.75),
    lineHeight: getCustomSize(3.5),
    letterSpacing: getCustomSize(0.043)
  },
  numbersIBMPlexSansMedium20: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(2.5),
    lineHeight: getCustomSize(3.125),
    letterSpacing: getCustomSize(0.0475)
  },
  numbersIBMPlexSansMedium17: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(2.125),
    lineHeight: getCustomSize(2.275),
    letterSpacing: getCustomSize(-0.05125)
  },
  numbersIBMPlexSansMedium15: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(1.875),
    lineHeight: getCustomSize(2.5),
    letterSpacing: getCustomSize(-0.03)
  },
  numbersIBMPlexSansMedium13: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(1.625),
    lineHeight: getCustomSize(2.25),
    letterSpacing: getCustomSize(-0.01)
  },
  numbersIBMPlexSansMediumUppercase13: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(1.625),
    textTransform: 'uppercase',
    lineHeight: getCustomSize(2.25),
    letterSpacing: getCustomSize(-0.01)
  },
  numbersIBMPlexSansMedium11: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(1.375),
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  numbersIBMPlexSansRegular11: {
    fontFamily: FontsEnum.ibmPlexSansMedium,
    fontSize: getCustomSize(1.375),
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.00875)
  },
  numbersIBMPlexSansBold8: {
    fontFamily: FontsEnum.ibmPlexSansBold,
    fontSize: getCustomSize(),
    lineHeight: getCustomSize(1.625),
    letterSpacing: getCustomSize(0.0875)
  }
};
