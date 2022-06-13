import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { Account } from '../../components/account/account';
import { GasTokenBalance } from '../../components/gas-token-balance/gas-token-balance';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { AccountTokens } from './components/account-tokens/account-tokens';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();

  return (
    <View style={WalletStyles.root}>
      <NavigationBar />
      <ScrollView scrollEnabled={!isLocked}>
        <Account />
        <GasTokenBalance />
        <AccountTokens />
      </ScrollView>
    </View>
  );
};
