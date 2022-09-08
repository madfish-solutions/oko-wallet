import { StyleSheet } from 'react-native';

import { colors } from '../../../../styles/colors';
import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';

export const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: getCustomSize(3.5)
  },
  inputContainer: {
    position: 'relative',
    marginBottom: getCustomSize(1.5)
  },
  input: {
    width: '100%'
  },
  eyeIcon: {
    position: 'absolute',
    top: getCustomSize(1.25),
    right: getCustomSize()
  },
  checkbox: {
    marginBottom: getCustomSize(3)
  },
  text: {
    ...typography.captionInterSemiBold11,
    color: colors.textGrey2
  },
  linkingText: {
    marginHorizontal: getCustomSize(0.25),
    ...typography.captionInterSemiBold11,
    color: colors.orange,
    borderBottomWidth: getCustomSize(0.125),
    borderBottomColor: colors.orange
  }
});
