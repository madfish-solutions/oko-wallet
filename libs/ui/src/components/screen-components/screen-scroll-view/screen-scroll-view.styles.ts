import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../styles/format-size';
import { isWeb } from '../../../utils/platform.utils';

export const styles = StyleSheet.create({
  content: {
    padding: getCustomSize(2),
    paddingRight: isWeb ? getCustomSize(1.5) : getCustomSize(2)
  }
});
