import { StyleSheet } from 'react-native';

export const BackStyles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    height: 32
  },
  primary: {
    width: 170,
    backgroundColor: '#ff821b',
    borderRadius: 4
  },
  secondary: {
    backgroundColor: 'transaprent'
  },
  clear: {
    backgroundColor: 'transaprent',
    textDecorationLine: 'underline'
  }
});
