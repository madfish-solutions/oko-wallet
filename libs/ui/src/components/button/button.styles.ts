import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

import { themes } from './constants/themes';
import { Theme } from './types';

export const styles = (theme: Theme) => {
  const { backgroundColor, color } = themes[theme];

  return StyleSheet.create({
    root: {
      backgroundColor,
      flex: 1,
      flexBasis: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: getCustomSize(0.5),
      paddingVertical: getCustomSize(1.5)
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color,
      ...typography.taglineInterSemiBoldUppercase13
    },
    rightIcon: {
      marginLeft: getCustomSize(0.5)
    },
    leftIcon: {
      marginRight: getCustomSize(0.5)
    }
  });
};
