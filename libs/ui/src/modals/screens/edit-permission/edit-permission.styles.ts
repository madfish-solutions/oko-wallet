import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: getCustomSize(2.25)
  },
  proposedLimit: {
    marginBottom: getCustomSize()
  },
  icon: {
    marginRight: getCustomSize(0.5)
  },
  fieldName: {
    ...typography.captionInterSemiBold13
  },
  customField: {
    marginTop: getCustomSize(2),
    marginBottom: getCustomSize()
  }
});
