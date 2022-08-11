import { StyleSheet } from 'react-native';

import { mobileHeight } from '../../components/screen-container/constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  camera: {
    width: '100%',
    height: mobileHeight * 0.7
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});
