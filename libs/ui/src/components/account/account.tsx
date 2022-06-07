import React, { FC } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { useShelter } from '../../hooks/use-shelter.hook';
import { AccountInterface } from '../../interfaces/account.interface';
import { changeAccountAction } from '../../store/wallet/wallet.actions';
import {
  useAllAccountsSelector,
  useSelectedAccountPkhSelector,
  useSelectedAccountSelector,
  useSelectedNetworkTypeSelector
} from '../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';

import { AccountStyles } from './account.styles';

export const Account: FC = () => {
  const dispatch = useDispatch();
  const accounts = useAllAccountsSelector();
  const selectedAccount = useSelectedAccountSelector();
  const pkh = useSelectedAccountPkhSelector();
  const selectedNetworkType = useSelectedNetworkTypeSelector();
  const { createHdAccount, createHdAccountForNewNetworkType } = useShelter();

  const handleChangeAccount = (account: AccountInterface) => {
    if (checkIsNetworkTypeKeyExist(account, selectedNetworkType)) {
      dispatch(changeAccountAction(account));
    } else {
      createHdAccountForNewNetworkType(account, selectedNetworkType);
    }
  };

  return (
    <View style={AccountStyles.root}>
      <View style={AccountStyles.container}>
        <View style={AccountStyles.selectedAccountInfo}>
          <Text style={AccountStyles.selectedAccountName}>{selectedAccount.name}</Text>
          <Text>{pkh.substring(0, 12)}</Text>
        </View>
        <Text style={AccountStyles.allAccountsText}>All accounts:</Text>
        <ScrollView style={AccountStyles.accountsList}>
          {accounts.map(account => {
            const pkh = checkIsNetworkTypeKeyExist(account, selectedNetworkType)
              ? account.networksKeys[selectedNetworkType]?.publicKeyHash.substring(0, 12)
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
      <TouchableOpacity onPress={createHdAccount} style={AccountStyles.createAccountButton}>
        <Text>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};
