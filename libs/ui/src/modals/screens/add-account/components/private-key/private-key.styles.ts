import { StyleSheet } from 'react-native';
import { isMobile } from 'shared';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    paddingHorizontal: getCustomSize(2)
  },
  inputNameContainer: {
    width: '100%',
    marginBottom: getCustomSize(3.5)
  },
  container: {
    position: 'relative'
  },
  inputContainer: {
    width: '100%'
  },
  inputInnerContainer: {
    height: getCustomSize(14.75)
  },
  textarea: {
    height: '100%',
    paddingRight: getCustomSize(4.25),
    paddingTop: getCustomSize(1.75),
    paddingBottom: getCustomSize(1.75)
  },
  clearIcon: {
    position: 'absolute',
    top: isMobile ? getCustomSize(1.5) : getCustomSize(),
    right: 0
  },
  pasteButtonContainer: {
    position: 'absolute',
    bottom: getCustomSize(1.5),
    right: getCustomSize(1.5)
  },
  pasteButtonText: {
    color: colors.orange,
    ...typography.taglineInterSemiBoldUppercase11
  },
  buttons: {
    paddingTop: getCustomSize(2)
  }
});
