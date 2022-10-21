import { StyleSheet } from 'react-native';

import { maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey1,
    ...maximiseViewStyles
  }
});
