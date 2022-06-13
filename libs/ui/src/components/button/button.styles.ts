import { StyleSheet } from 'react-native';

import { colorScheme } from './constants/color-scheme';
import { ButtonColor } from './types';

export const buttonStyles = (buttonColor: ButtonColor) => {
  const { backgroundColor, color } = colorScheme[buttonColor];

  return StyleSheet.create({
    container: {
      backgroundColor,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      paddingVertical: 15
    },
    contentWrapper: {
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
      marginLeft: 10
    },
    leftIcon: {
      marginRight: 10
    }
  });
};
