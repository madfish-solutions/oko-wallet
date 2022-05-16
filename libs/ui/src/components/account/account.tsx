import { nanoid } from '@reduxjs/toolkit';
import React, { FC, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { AccountInterface } from '../../interfaces/account.interface';
import { generateHDAccountAction, switchAccountAction } from '../../store/wallet/wallet.actions';
import {
  useAccountsByBlockchainSelector,
  useSelectedAccountByBlockchainSelector
} from '../../store/wallet/wallet.selectors';
import { shortize } from '../../utils/shortize.utils';

import { AccountStyles } from './account.styles';

export const Account: FC = () => {
  const accounts = useAccountsByBlockchainSelector();
  const selectedAccount = useSelectedAccountByBlockchainSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!accounts.length) {
      dispatch(generateHDAccountAction.submit());
    }
  }, []);

  const handleCreateAccount = async () => {
    dispatch(generateHDAccountAction.submit());
  };

  const handleSwitchAccount = (account: AccountInterface) => {
    dispatch(switchAccountAction(account));
  };

  return (
    <View style={AccountStyles.root}>
      <View style={AccountStyles.container}>
        <View style={AccountStyles.selectedAccountInfo}>
          <Text style={AccountStyles.selectedAccountName}>{selectedAccount.name}</Text>
          <Text>{shortize(selectedAccount.publicKeyHash)}</Text>
        </View>
        <Text style={AccountStyles.allAccountsText}>All accounts:</Text>
        <ScrollView style={AccountStyles.accountsList}>
          {accounts.map((account, index) => (
            <TouchableOpacity key={nanoid()} onPress={() => handleSwitchAccount(account)} style={AccountStyles.account}>
              <Text style={AccountStyles.textBlock}>{`${index + 1}. ${account.name}`}</Text>
              <Text style={AccountStyles.publicKeyHash}>{shortize(account.publicKeyHash)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleCreateAccount} style={AccountStyles.createAccountButton}>
        <Text>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};
