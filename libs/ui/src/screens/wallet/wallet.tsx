import React, { FC } from 'react';

import { Account } from '../../components/account/account';
import { Networks } from '../../components/networks/networks';
import { ScreenContainer } from '../../components/screen-container/screen-container';

import { Activity } from './components/activity/activity';
import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';

export const Wallet: FC = () => (
  <ScreenContainer>
    <Account />
    <Networks />
    <AssetsWidget />
    <CollectiblesWidget />
    <Activity />
  </ScreenContainer>
);
