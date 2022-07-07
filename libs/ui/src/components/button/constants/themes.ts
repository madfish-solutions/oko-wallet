import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

const commonStyles = {
  borderRadius: getCustomSize(1.75),
  paddingVertical: getCustomSize(1.25),
  typography: {
    ...typography.taglineInterSemiBoldUppercase15
  },
  borderWidth: getCustomSize(0.25),
  borderColor: 'transparent'
};

export const themes = {
  primary: {
    borderRadius: getCustomSize(0.5),
    color: colors.textGrey1,
    backgroundColor: colors.navGrey1,
    paddingVertical: getCustomSize(1.5),
    typography: {
      ...typography.taglineInterSemiBoldUppercase13
    }
  },
  orange: {
    ...commonStyles,
    color: colors.textGrey1,
    backgroundColor: colors.orange
  },
  dark: {
    ...commonStyles,
    color: colors.orange,
    backgroundColor: colors.navGrey1,
    borderColor: colors.bgGrey2
  },
  disabled: {
    ...commonStyles,
    color: colors.textGrey2,
    backgroundColor: colors.bgGrey5
  }
};
