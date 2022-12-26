import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  panel: {
    justifyContent: 'space-between',
    height: getCustomSize(7),
    paddingHorizontal: getCustomSize(2)
  },
  filterName: {
    ...typography.captionInterRegular13
  }
});
