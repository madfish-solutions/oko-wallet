import React, { FC } from 'react';

import { ScreenContainer } from '../../components/screen-container/screen-container';

import { Activity } from './components/activity/activity';
import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';

export const Wallet: FC = () => (
  <ScreenContainer>
    <AssetsWidget />
    <CollectiblesWidget />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
    <Activity />
  </ScreenContainer>
);
