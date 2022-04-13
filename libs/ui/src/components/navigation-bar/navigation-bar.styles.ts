import {StyleSheet} from 'react-native';

export const NavigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: 100,
    padding: 8,
    borderWidth: 1,
    borderColor: 'blue',
    margin: 4
  },
  buttonText: {
    color: 'blue',
    textAlign: 'center'
  }
});
