import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { typography } from '../../../styles/typography';

export const styles = StyleSheet.create({
  text: {
    ...typography.numbersIBMPlexSansMedium13,
    maxWidth: getCustomSize(10)
  },
  marginRight: {
    marginRight: getCustomSize(0.25)
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  balance: {
    ...typography.numbersIBMPlexSansMedium13
  }
});
