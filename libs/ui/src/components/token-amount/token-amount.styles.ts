import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  text: {
    ...typography.numbersIBMPlexSansMedium13
  },
  lessSign: {
    position: 'relative',
    bottom: getCustomSize(0.0625),
    marginRight: getCustomSize(0.5)
  },
  symbol: {
    marginLeft: getCustomSize(0.25),
    maxWidth: getCustomSize(18.75)
  }
});
