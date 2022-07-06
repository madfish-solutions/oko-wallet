import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { typography } from '../../styles/typography';

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
    color: colors.textGrey1,
    ...typography.headlineInterBold22
  },
  allAccountsText: {
    textTransform: 'uppercase',
    color: colors.textGrey1
  },
  accountsList: {
    marginTop: 4
  },
  account: {
    marginTop: 4
  },
  accountName: {
    color: colors.textGrey1,
    marginBottom: 4
  },
  publicKeyHash: {
    color: colors.textGrey1,
    fontSize: 12
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#454545',
    padding: 4,
    borderRadius: 4
  }
});
