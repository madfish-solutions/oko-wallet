import { StyleSheet } from 'react-native';

import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  percent: {
    ...typography.numbersIBMPlexSansMedium11
  },
  ascendingIcon: {
    transform: [
      {
        rotate: '180deg'
      }
    ]
  }
});
