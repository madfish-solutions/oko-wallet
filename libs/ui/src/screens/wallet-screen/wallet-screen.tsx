import React from 'react';
import { Text, View } from 'react-native';

import { ChainsDropdown } from '../../components/chains-dropdown';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Title } from '../../components/title';
import { useGetNetworkSelector } from '../../store/settings/settings.selectors';
import { useGetGasTokenDataSelector } from '../../store/wallet/wallet.selectors';

import { WalletScreenStyles } from './wallet-screen.styles';

export const WalletScreen = () => {
  const { gasToken, gasTokenBalance } = useGetGasTokenDataSelector();
  const network = useGetNetworkSelector();

  const getGasTokenBalance = () =>
    gasTokenBalance.isLoading ? 'Loading...' : `${gasTokenBalance.data} ${gasToken.symbol}`;

  return (
    <View>
      <NavigationBar />
      <Title>Wallet</Title>
      <View style={WalletScreenStyles.root}>
        <ChainsDropdown />
        <Text>{`Network: ${network}`}</Text>
        <Text>{`Balance: ${getGasTokenBalance()}`}</Text>
      </View>
    </View>
  );
};
