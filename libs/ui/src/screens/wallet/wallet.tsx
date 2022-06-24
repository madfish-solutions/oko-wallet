import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { Account } from '../../components/account/account';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { AssetsWidget } from './components/assets-widget/assets-widget';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();

  return (
    <View style={WalletStyles.root}>
      <ScrollView scrollEnabled={!isLocked}>
        <Account />
        <Networks />
        <AssetsWidget assetsNumber={2} />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};
