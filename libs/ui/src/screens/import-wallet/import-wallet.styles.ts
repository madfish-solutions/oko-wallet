import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  title: {
    marginBottom: getCustomSize(0.5),
    ...typography.captionInterRegular13,
    color: colors.textGrey3
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
  wordsColumn: {
    flex: 1
  },
  marginRight: {
    marginRight: getCustomSize(0.5)
  },
  containerStyle: {
    paddingHorizontal: getCustomSize(4)
  },
  inputContainer: {
    position: 'relative',
    backgroundColor: colors.navGrey1,
    height: getCustomSize(4.5),
    marginBottom: getCustomSize(0.5)
  },
  mnemonicInput: {
    alignItems: 'center',
    height: getCustomSize(4.5),
    width: '100%'
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
  buttonIcon: {
    marginRight: getCustomSize(0.5)
  }
});
