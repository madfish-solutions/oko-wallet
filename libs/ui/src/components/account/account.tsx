import { nanoid } from '@reduxjs/toolkit';
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
import { shortize } from '../../utils/shortize.utils';

import { AccountStyles } from './account.styles';

export const Account: FC = () => {
  const dispatch = useDispatch();
  const accounts = useAllAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();
  const pkh = useSelectedAccountPkhSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();

  useEffect(() => {
    if (!accounts.length) {
      dispatch(generateHDAccountAction.submit());
    }
  }, []);

  const handleCreateAccount = async () => {
    dispatch(generateHDAccountAction.submit());
  };

  const handleSwitchAccount = (account: AccountInterface) => {
    const isExist = account.networks.hasOwnProperty(selectedNetworkType);

    if (isExist) {
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
          {accounts.map((account, index) => {
            const isExist = account.networks.hasOwnProperty(selectedNetworkType);
            const pkh = isExist ? shortize(account.networks[selectedNetworkType].publicKeyHash) : 'Not genarated';

            return (
              <TouchableOpacity
                key={nanoid()}
                onPress={() => handleSwitchAccount(account)}
                style={AccountStyles.account}
              >
                <Text style={AccountStyles.textBlock}>{`${index + 1}. ${account.name}`}</Text>
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
