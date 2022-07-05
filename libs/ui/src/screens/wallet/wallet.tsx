import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';

import { Account } from '../../components/account/account';
import { Button } from '../../components/button/button';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Networks } from '../../components/networks/networks';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { Activity } from './components/activity/activity';
import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';
import { WalletStyles } from './wallet.styles';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();
  const { navigate } = useNavigation();

  const navigateToAccount = () => navigate(ScreensEnum.AccountsSelector);

  return (
    <View style={WalletStyles.root}>
      <ScrollView scrollEnabled={!isLocked}>
        <Button title="Accounts" onPress={navigateToAccount} />
        <Account />
        <Networks />
        <AssetsWidget />
        <CollectiblesWidget />
        <Activity />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};
