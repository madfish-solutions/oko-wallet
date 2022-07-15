import React, { FC } from 'react';

import { MainScreenContainer } from '../../components/screen-container/main-screen-container/main-screen-container';

import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';

export const Wallet: FC = () => (
  <MainScreenContainer>
    <AssetsWidget />
    <CollectiblesWidget />
  </MainScreenContainer>
);
