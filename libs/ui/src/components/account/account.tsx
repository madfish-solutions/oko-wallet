import React, { FC, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AccountInterface } from '../../interfaces/account.interface';
import {
  generateHdAccountByNetworkTypeAction,
  generateHDAccountAction,
  changeAccountAction
} from '../../store/wallet/wallet.actions';
import {
  useAllAccountsSelector,
  useSelectedAccountPkhSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-account-exist.utils';
import { shortize } from '../../utils/shortize.utils';

import { AccountStyles } from './account.styles';

export const Account: FC = () => {
  const dispatch = useDispatch();
  const accounts = useAllAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();
  const pkh = useSelectedAccountPkhSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  const dispatchGenerateHDAccount = () => dispatch(generateHDAccountAction.submit());

  useEffect(() => {
    if (!accounts.length) {
      dispatchGenerateHDAccount();
    }
  }, []);

  const handleCreateAccount = () => {
    dispatchGenerateHDAccount();
  };

  const handleChangeAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
    } else {
      dispatch(generateHdAccountByNetworkTypeAction.submit(account));
    }
  };

  return (
    <View style={AccountStyles.root}>
      <View style={AccountStyles.container}>
        <View style={AccountStyles.selectedAccountInfo}>
          <Text style={AccountStyles.selectedAccountName}>{selectedAccount.name}</Text>
          <Text>{shortize(pkh)}</Text>
        </View>
        <Text style={AccountStyles.allAccountsText}>All accounts:</Text>
        <ScrollView style={AccountStyles.accountsList}>
          {accounts.map(account => {
            const pkh = checkIsNetworkTypeKeyExist(account, selectedNetworkType)
              ? shortize(account.networks[selectedNetworkType].publicKeyHash)
              : 'Not generated';

            return (
              <TouchableOpacity
                key={account.accountIndex}
                onPress={() => handleChangeAccount(account)}
                style={AccountStyles.account}
              >
                <Text style={AccountStyles.textBlock}>{account.name}</Text>
                <Text style={AccountStyles.publicKeyHash}>{pkh}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleCreateAccount} style={AccountStyles.createAccountButton}>
        <Text>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};
