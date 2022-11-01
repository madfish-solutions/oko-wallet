import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  lessSign: {
    position: 'relative',
    bottom: getCustomSize(0.125),
    marginRight: getCustomSize(0.5)
  },
  text: {
    ...typography.numbersIBMPlexSansMedium13
  },
  symbol: {
    marginLeft: getCustomSize(0.25)
  }
});
