import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  mnemonicContainer: {
    marginBottom: getCustomSize(2),
    borderRadius: getCustomSize(),
    backgroundColor: colors.bgGrey4
  },
  wordsWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'flex-start'
  },
  content: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: getCustomSize(0.75),
    paddingTop: getCustomSize(0.75)
  },
  marginRight: {
    marginRight: getCustomSize(0.5)
  },
  mnemonicItem: {
    position: 'relative',
    alignItems: 'center',
    width: '49.3%',
    height: getCustomSize(4.5),
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
  buttons: {
    width: '100%',
    justifyContent: 'center',
    paddingVertical: getCustomSize(2)
  }
});
