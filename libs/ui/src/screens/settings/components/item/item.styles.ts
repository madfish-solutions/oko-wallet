import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { typography } from '../../../../styles/typography';
import { isAndroid } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    height: getCustomSize(6),
    padding: getCustomSize(1.5)
  },
  content: {
    justifyContent: 'space-between'
  },
  titleContainer: {
    maxWidth: getCustomSize(isAndroid ? 33 : 30)
  },
  title: {
    ...typography.bodyInterSemiBold15
  },
  icon: {
    marginRight: getCustomSize(0.5)
  }
});
