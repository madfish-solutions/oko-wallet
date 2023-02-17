import { StyleSheet } from 'react-native';
import { isWeb } from 'shared';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
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
  wordsColumn: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  marginRight: {
    marginRight: getCustomSize(0.5)
  },
  inputContainer: {
    height: getCustomSize(4.5),
    width: '49.3%',
    marginBottom: getCustomSize(0.5)
  },
  mnemonicInput: {
    alignItems: 'center',
    height: getCustomSize(4.5),
    width: '100%',
    color: colors.textGrey1,
    paddingHorizontal: getCustomSize(4.5),
    borderRadius: getCustomSize(0.5),
    borderWidth: getCustomSize(0.125),
    borderColor: colors.navGrey1,
    backgroundColor: colors.navGrey1,
    textAlign: 'center',
    ...(isWeb && { outlineStyle: 'none' }),
    ...(isWeb && { caretColor: colors.orange }),
    overflow: 'hidden'
  },
  error: {
    borderColor: colors.orange
  },
  wordIndex: {
    position: 'absolute',
    left: getCustomSize(1.5),
    top: getCustomSize(1),
    color: colors.textGrey2,
    ...typography.bodyInterRegular15
  },
  layout: {
    position: 'absolute',
    left: getCustomSize(0.25),
    right: getCustomSize(0.25),
    top: getCustomSize(0.25),
    bottom: getCustomSize(0.25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey2,
    borderRadius: getCustomSize(0.25),
    ...(isWeb && { cursor: 'pointer' })
  },
  layoutText: {
    ...typography.taglineInterSemiBoldUppercase11,
    color: colors.orange
  },
  buttons: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: getCustomSize(2)
  },
  errorText: {
    marginTop: getCustomSize(),
    color: colors.red,
    ...typography.captionInterRegular11
  }
});
