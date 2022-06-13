import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

import { themes } from './constants/themes';
import { Theme } from './types';

export const styles = (theme: Theme) => {
  const { backgroundColor, color } = themes[theme];

  return StyleSheet.create({
    root: {
      backgroundColor,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: getCustomSize(0.5),
      paddingVertical: getCustomSize(1.875)
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color
      // TODO uncomment when fonts will be merged
      // ...taglineInterSemiBoldUppercase13
    },
    rightIcon: {
      marginLeft: getCustomSize(1.25)
    },
    leftIcon: {
      marginRight: getCustomSize(1.25)
    }
  });
};
