import React, { FC } from 'react';
import { View } from 'react-native';

import { Account } from '../../components/account/account';
import { GasTokenBalance } from '../../components/gas-token-balance/gas-token-balance';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

import { AccountTokens } from './components/account-tokens/account-tokens';

export const Wallet: FC = () => (
  <View>
    <NavigationBar />
    <Account />
    <GasTokenBalance />
    <AccountTokens />
  </View>
);
