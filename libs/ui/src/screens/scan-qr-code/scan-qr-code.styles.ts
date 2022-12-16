import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    width: '100%'
  },
  camera: {
    width: '100%',
    height: '100%'
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject
  }
});
