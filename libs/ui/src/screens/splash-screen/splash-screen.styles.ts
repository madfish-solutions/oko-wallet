import { StyleSheet } from 'react-native';

import { maximiseViewStyles } from '../../components/navigator/utils/maximise-view-options';
import { colors } from '../../styles/colors';
import { isMobile, isWeb } from '../../utils/platform.utils';

export const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey1,
    ...(isMobile && {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      zIndex: 100000000
    }),
    ...(isWeb && maximiseViewStyles)
  }
});
