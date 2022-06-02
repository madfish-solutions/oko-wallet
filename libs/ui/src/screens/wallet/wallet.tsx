import React, { FC, useMemo, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { mockAccountsAddresses } from '../../constants/accounts';
import { switchAccountAction } from '../../store/wallet/wallet.actions';
import { useVisibleAccountTokensSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const dispatch = useDispatch();
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const [inputNameSearch, setInputNameSearch] = useState('');

  const filteredTokens = useMemo(() => {
    if (inputNameSearch) {
      return visibleAccountTokens.filter(
        ({ name, symbol, tokenAddress }) =>
          name.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          symbol.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          tokenAddress.toLowerCase().includes(inputNameSearch.toLowerCase())
      );
    }

    return visibleAccountTokens;
  }, [inputNameSearch]);

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

  const handleSwitchAccount = (pkh: string) => dispatch(switchAccountAction(pkh));

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.wrapper}>
          Balance: <Text style={WalletStyles.boldText}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />
        <View>
          <Button title="Account 1" onPress={() => handleSwitchAccount(mockAccountsAddresses.account_1)} />
          <Button title="Account 2" onPress={() => handleSwitchAccount(mockAccountsAddresses.account_2)} />
        </View>
        <TextInput
          style={WalletStyles.input}
          onChangeText={setInputNameSearch}
          value={inputNameSearch}
          placeholder="find token..."
        />
        <AccountTokens visibleAccountTokens={filteredTokens} />
      </View>
    </View>
  );
};
