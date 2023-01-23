import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';
import { isMobile } from '../../../../../utils/platform.utils';

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
  textarea: {
    height: getCustomSize(14.75),
    marginTop: getCustomSize(1.25),
    marginBottom: getCustomSize(3),
    paddingRight: getCustomSize()
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
