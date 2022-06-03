import { StyleSheet } from 'react-native';

export const AccountStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    position: 'relative',
    paddingLeft: 12,
    paddingRight: 12
  },
  container: {
    marginBottom: 24
  },
  selectedAccountInfo: {
    marginBottom: 24
  },
  selectedAccountName: {
    fontWeight: '700'
  },
  allAccountsText: {
    textTransform: 'uppercase'
  },
  accountsList: {
    maxHeight: 200,
    height: '100%',
    marginTop: 4
  },
  account: {
    marginTop: 4
  },
  textBlock: {
    marginBottom: 4
  },
  publicKeyHash: {
    fontSize: 12
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#454545',
    padding: 4,
    borderRadius: 4
  }
});