import { StyleSheet } from 'react-native';

export const BackStyles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 38
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
