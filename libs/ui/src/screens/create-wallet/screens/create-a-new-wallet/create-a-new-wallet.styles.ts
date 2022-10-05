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
  mnemonicContainer: {
    marginBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(0.75),
    paddingTop: getCustomSize(0.75),
    borderRadius: getCustomSize(),
    backgroundColor: colors.bgGrey4
  },
  wordsWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'flex-start'
  },
  layout: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey4,
    zIndex: 1
  },
  layoutText: {
    position: 'absolute',
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  },
  layoutBlock: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.5)
  },
  wordsColumn: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  marginRight: {
    marginRight: getCustomSize(0.5)
  },
  mnemonicItem: {
    alignItems: 'center',
    width: '49.3%',
    marginBottom: getCustomSize(0.5),
    paddingHorizontal: getCustomSize(1.5),
    paddingVertical: getCustomSize(),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(0.5)
  },
  wordIndex: {
    position: 'absolute',
    left: getCustomSize(1.5),
    top: getCustomSize(1),
    color: colors.textGrey2,
    ...typography.bodyInterRegular15
  },
  word: {
    ...typography.bodyInterRegular15
  },
  buttonText: {
    ...typography.taglineInterSemiBoldUppercase13,
    color: colors.orange
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: getCustomSize(2)
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonMarginRight: {
    marginRight: getCustomSize(5)
  },
  buttonIcon: {
    marginRight: getCustomSize(0.5)
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
