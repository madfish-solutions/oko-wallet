import React, { FC } from 'react';

import { Account } from '../../components/account/account';
import { Button } from '../../components/button/button';
import { Networks } from '../../components/networks/networks';
import { ScreenContainer } from '../../components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';

import { Activity } from './components/activity/activity';
import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';

export const Wallet: FC = () => {
  const { navigate } = useNavigation();

  const navigateToAccount = () => navigate(ScreensEnum.AccountsSelector);

  return (
    <ScreenContainer>
      <Button title="Accounts" onPress={navigateToAccount} />
      <Account />
      <Networks />
      <AssetsWidget />
      <CollectiblesWidget />
      <Activity />
    </ScreenContainer>
  );
};
