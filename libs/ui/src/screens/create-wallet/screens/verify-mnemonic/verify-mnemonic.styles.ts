import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  title: {
    marginBottom: getCustomSize(),
    ...typography.captionInterRegular13,
    color: colors.textGrey3
  },
  description: {
    marginBottom: getCustomSize(),
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  container: {
    padding: getCustomSize(0.75),
    backgroundColor: colors.bgGrey4,
    borderRadius: getCustomSize(),
    borderWidth: getCustomSize(0.125),
    borderColor: 'transparent'
  },
  containerError: {
    borderWidth: getCustomSize(0.125),
    borderColor: colors.red
  },
  wordsWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: getCustomSize(3)
  },
  wordsColumn: {
    width: '100%',
    flexWrap: 'wrap'
  },
  marginRight: {
    marginRight: getCustomSize(0.5)
  },
  mnemonicItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '49.3%',
    height: getCustomSize(4.5),
    marginBottom: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    borderRadius: getCustomSize(0.5),
    borderWidth: getCustomSize(0.25),
    borderColor: colors.bgGrey2
  },
  active: {
    borderColor: colors.orange
  },
  wordIndex: {
    position: 'absolute',
    left: getCustomSize(1.5),
    top: getCustomSize(0.75),
    color: colors.textGrey2,
    ...typography.bodyInterRegular15
  },
  word: {
    ...typography.bodyInterRegular15
  },
  wordsSelectorTitle: {
    marginBottom: getCustomSize(),
    ...typography.captionInterRegular11,
    color: colors.textGrey2
  },
  wordsSelector: {
    justifyContent: 'space-between',
    width: '100%'
  },
  wordButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: getCustomSize(4.5),
    borderRadius: getCustomSize(0.5),
    backgroundColor: colors.orange
  },
  selectedWord: {
    backgroundColor: colors.bgGrey5
  },
  wordButtonText: {
    ...typography.bodyInterRegular15
  },
  error: {
    marginTop: getCustomSize(0.5),
    ...typography.captionInterRegular11,
    color: colors.red
  }
});
