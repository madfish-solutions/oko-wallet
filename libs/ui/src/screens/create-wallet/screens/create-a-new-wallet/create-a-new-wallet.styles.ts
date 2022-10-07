import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  warning: {
    marginBottom: getCustomSize(2)
  },
  wordsAmount: {
    justifyContent: 'space-between',
    marginBottom: getCustomSize()
  },
  amountWordsText: {
    ...typography.captionInterSemiBold13
  },
  wordsSelector: {
    justifyContent: 'space-between',
    paddingVertical: getCustomSize(1.125),
    paddingLeft: getCustomSize(2.25),
    paddingRight: getCustomSize(1.75),
    borderRadius: getCustomSize(2.5),
    backgroundColor: colors.bgGrey4
  },
  amountWords: {
    marginRight: getCustomSize(2.625),
    ...typography.captionInterSemiBold13
  },
  marginRight: {
    marginRight: getCustomSize(5)
  },
  confirmation: {
    marginBottom: getCustomSize()
  },
  confirmationWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    marginRight: getCustomSize(0.5)
  },
  confirmationText: {
    ...typography.captionInterSemiBold13,
    color: colors.textGrey2
  },
  error: {
    marginTop: getCustomSize(0.5),
    ...typography.captionInterRegular11,
    color: colors.red
  }
});
