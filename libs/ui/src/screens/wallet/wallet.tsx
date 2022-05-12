import { nanoid } from '@reduxjs/toolkit';
import React, { FC, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { AccountInterface } from '../../store/interfaces/account.interface';
import { generateHDAccountAction, switchAccountAction } from '../../store/wallet/wallet.actions';
import { useAccountsSelector, useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';
import { shortize } from '../../utils/shortize.utils';

import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const accounts = useAccountsSelector();
  const selectedAccound = useSelectedAccountSelector();
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
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <View style={WalletStyles.container}>
          <Text>{selectedAccound.name}</Text>
          <Text>{shortize(selectedAccound.publicKeyHash)}</Text>
          <TouchableOpacity onPress={handleCreateAccount} style={WalletStyles.button}>
            <Text>Create account</Text>
          </TouchableOpacity>
        </View>
        <View style={WalletStyles.accounts}>
          <TouchableOpacity style={WalletStyles.button}>
            <Text>Accounts</Text>
          </TouchableOpacity>
          <View style={WalletStyles.dropdown}>
            <View style={WalletStyles.dropdownContainer}>
              {accounts.map(account => (
                <TouchableOpacity
                  key={nanoid()}
                  onPress={() => handleSwitchAccount(account)}
                  style={WalletStyles.account}
                >
                  <Text style={WalletStyles.text}>{account.name}</Text>
                  <Text style={[WalletStyles.text, WalletStyles.address]}>{shortize(account.publicKeyHash)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
