import { StyleSheet } from 'react-native';

export const NavigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  button: {
    padding: 6,
    borderWidth: 1,
    borderColor: 'blue'
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center'
  }
});
