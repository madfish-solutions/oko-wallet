import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../../../styles/format-size';
import { isWeb } from '../../../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    marginTop: getCustomSize(2),
    marginHorizontal: getCustomSize(2),
    marginRight: isWeb ? getCustomSize(1.5) : getCustomSize(2),
    paddingBottom: getCustomSize(2.75)
  }
});
