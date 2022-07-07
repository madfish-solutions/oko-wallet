import { StyleSheet } from 'react-native';

import { getCustomSize } from '../../styles/format-size';

import { themes } from './constants/themes';
import { Theme } from './types';

export const styles = (theme: Theme, disabled: boolean) => {
  const currentTheme = disabled ? 'disabled' : theme;
  const { backgroundColor, color, typography, paddingVertical, borderRadius, ...restStyles } = themes[currentTheme];

  return StyleSheet.create({
    root: {
      backgroundColor,
      flex: 1,
      flexBasis: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius,
      paddingVertical,
      ...restStyles
    },
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color,
      ...typography
    },
    rightIcon: {
      marginLeft: getCustomSize(0.5)
    },
    leftIcon: {
      marginRight: getCustomSize(0.5)
    }
  });
};
