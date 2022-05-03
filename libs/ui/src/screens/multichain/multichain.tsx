import React from 'react';
import { Text, View } from 'react-native';

import { ChainsDropdown } from '../../components/chains-dropdown';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useGetTokenData } from '../../store/wallet/wallet.selectors';
import { MultichainStyles } from '../inner-screen/multichain.styles';

export const Multichain = () => {
  const { tokenSymbol, balance } = useGetTokenData();

  return (
    <View>
      <NavigationBar />
      <View style={MultichainStyles.root}>
        <ChainsDropdown />
        <Text style={MultichainStyles.text}>{`Balance: ${balance} ${tokenSymbol}`}</Text>
      </View>
    </View>
  );
};
