import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  icon: {
    marginRight: getCustomSize(0.5)
  },
  image: {
    width: '100%',
    height: '100%'
  },
  symbol: {
    ...typography.bodyInterSemiBold15
  },
  name: {
    ...typography.captionInterRegular11
  }
});
