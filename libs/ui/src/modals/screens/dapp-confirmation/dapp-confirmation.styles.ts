import { StyleSheet } from 'react-native';

import { colors } from '../../../styles/colors';
import { getCustomSize } from '../../../styles/format-size';
//import { typography } from '../../../../../styles/typography';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: getCustomSize(2),
    paddingHorizontal: getCustomSize(8),
    paddingVertical: getCustomSize(1.5)
  },
  imageContainer: {
    height: getCustomSize(8),
    width: getCustomSize(8),
    borderColor: colors.border1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
