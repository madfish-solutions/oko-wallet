import { StyleSheet } from 'react-native';

export const InputStyles = StyleSheet.create({
  root: {
    display: 'flex',
    flex: 1
  },
  title: {
    marginBottom: 4
  },
  input: {
    width: '100%',
    height: 32,
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderColor: '#454545',
    borderRadius: 4
  }
});
