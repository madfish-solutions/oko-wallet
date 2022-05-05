import { StyleSheet } from 'react-native';

export const TitleStyles = StyleSheet.create({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 12
  },
  back: {
    position: 'absolute',
    left: 4
  },
  title: {
    textAlign: 'center'
  }
});
