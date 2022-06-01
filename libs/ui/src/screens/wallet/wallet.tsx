import React, { FC, useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { Token } from '../../interfaces/token.interface';
import { useVisibleAccountTokensSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const [inputNameSearch, setInputNameSearch] = useState('');
  const [FiltredTokens, setFiltredTokens] = useState<Token[]>([]);

  useEffect(() => {
    setFiltredTokens(
      visibleAccountTokens.filter(
        ({ name, symbol }) =>
          name.toLowerCase().includes(inputNameSearch.toLowerCase()) ||
          symbol.toLowerCase().includes(inputNameSearch.toLowerCase())
      )
    );
  }, [inputNameSearch]);

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.wrapper}>
          Balance: <Text style={WalletStyles.boldText}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />
        <TextInput
          style={WalletStyles.input}
          onChangeText={setInputNameSearch}
          value={inputNameSearch}
          placeholder="find token..."
        />
        <AccountTokens visibleAccountTokens={inputNameSearch ? FiltredTokens : visibleAccountTokens} />
      </View>
    </View>
  );
};
