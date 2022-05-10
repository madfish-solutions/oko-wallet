import { StyleSheet } from 'react-native';

export const TokenListStyles = StyleSheet.create({
  listHeader: {
    margin: 4
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  tokensList: {
    paddingTop: 8
  },
  token: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row'
  },
  tokenBalance: {
    paddingLeft: 8,
    fontWeight: 'bold',
    color: 'blue'
  },
});
