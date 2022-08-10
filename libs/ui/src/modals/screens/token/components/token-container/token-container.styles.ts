import { StyleSheet } from 'react-native';

import { colors } from '../../../../../styles/colors';
import { getCustomSize } from '../../../../../styles/format-size';
import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    marginBottom: getCustomSize(1)
  },
  inputContainer: {
    marginBottom: getCustomSize(3.5)
  },
  textareaContainer: {
    position: 'relative'
  },
  iconUrlInput: {
    height: getCustomSize(11),
    paddingBottom: getCustomSize(5),
    textAlignVertical: 'top'
  },
  clearIcon: {
    top: getCustomSize(1.5)
  },
  tokenImage: {
    position: 'absolute',
    bottom: getCustomSize(1.5),
    left: getCustomSize(1.5)
  },
  image: {
    width: '100%',
    height: '100%'
  },
  tokenSymbol: {
    marginLeft: getCustomSize(0.5),
    color: colors.textGrey1,
    ...typography.bodyInterSemiBold15
  }
});
