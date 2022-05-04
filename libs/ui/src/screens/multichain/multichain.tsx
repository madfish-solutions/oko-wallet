import React from 'react';
import { Text, View } from 'react-native';

import { ChainsDropdown } from '../../components/chains-dropdown';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useGetNetworkSelector } from '../../store/settings/settings.selectors';
import { useGetGasTokenDataSelector } from '../../store/wallet/wallet.selectors';
import { MultichainStyles } from '../inner-screen/multichain.styles';

export const Multichain = () => {
  const { gasToken, gasTokenBalance } = useGetGasTokenDataSelector();
  const network = useGetNetworkSelector();

  const getGasTokenBalance = () =>
    gasTokenBalance.isLoading ? 'Loading...' : `${gasTokenBalance.data} ${gasToken.symbol}`;

  return (
    <View>
      <NavigationBar />
      <View style={MultichainStyles.root}>
        <ChainsDropdown />
        <Text style={MultichainStyles.text}>{`Network: ${network}`}</Text>
        <Text>{`Balance: ${getGasTokenBalance()}`}</Text>
      </View>
    </View>
  );
};
