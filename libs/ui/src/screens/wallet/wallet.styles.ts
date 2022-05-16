import { StyleSheet } from 'react-native';

export const WalletStyles = StyleSheet.create({
  root: {
    alignItems: 'flex-start',
    position: 'relative',
    margin: 12
  },
  container: {
    alignItems: 'flex-start'
  },
  accounts: {
    position: 'absolute',
    right: 0
  },
  button: {
    borderWidth: 1,
    borderColor: '#454545',
    padding: 4,
    borderRadius: 4
  },
  dropdown: {
    position: 'absolute',
    top: '108%',
    right: 0,
    width: 160,
    padding: 8,
    backgroundColor: '#454545',
    borderRadius: 4
  },
  dropdownContainer: {
    padding: 4,
    borderWidth: 1,
    borderColor: '#8c8c8c',
    borderRadius: 4
  },
  account: {
    marginTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomColor: '#8c8c8c'
  },
  text: {
    color: '#fff'
  },
  address: {
    fontSize: 12,
    padding: 12
  },
  balanceWrapper: {
    marginBottom: 24
  },
  balance: {
    fontWeight: '700'
  }
});
