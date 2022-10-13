import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';
import { isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  title: {
    ...typography.bodyInterRegular17
  },
  content: {
    flex: 1,
    width: '100%',
    marginTop: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    paddingRight: isWeb ? getCustomSize(1.5) : getCustomSize(2)
  }
});
