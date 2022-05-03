import { StyleSheet } from 'react-native';

export const NavigationBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
    backgroundColor: '#eee',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc'
  },
  button: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'black',
    margin: 4
  },
  buttonText: {
    color: 'black',
    textAlign: 'center'
  }
});
