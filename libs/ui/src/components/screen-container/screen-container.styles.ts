import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';

export const ScreenContainerStyles = StyleSheet.create({
  root: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: colors.bgGrey1,
    paddingLeft: '24px',
    paddingRight: '24px'
  }
});
