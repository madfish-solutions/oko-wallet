import React, { FC } from 'react';

import { ScreenContainer } from '../../components/screen-container/screen-container';

import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';

export const Wallet: FC = () => (
  <ScreenContainer>
    <AssetsWidget />
    <CollectiblesWidget />
  </ScreenContainer>
);
