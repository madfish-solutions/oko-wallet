import React from 'react';
import { Text, View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

import { WalletStyles } from './wallet.styles';

export const Wallet = () => {
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={WalletStyles.root}>
        <Text style={WalletStyles.balanceWrapper}>
          Balance: <Text style={WalletStyles.balance}>{gasTokenBalanceWithLoading}</Text>
        </Text>
        <Networks />
      </View>
    </View>
  );
};
