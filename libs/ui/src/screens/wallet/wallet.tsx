import React, { FC } from 'react';

import { Account } from '../../components/account/account';
import { Networks } from '../../components/networks/networks';
import { ScreenContainer } from '../../components/screen-container/screen-container';
import { useUnlock } from '../../hooks/use-unlock.hook';

import { AssetsWidget } from './components/assets-widget/assets-widget';
import { CollectiblesWidget } from './components/collectibles/collectibles';

export const Wallet: FC = () => {
  const { isLocked } = useUnlock();

  return (
    <ScreenContainer scrollEnabled={!isLocked}>
      <Account />
      <Networks />
      <AssetsWidget />
      <CollectiblesWidget />
    </ScreenContainer>
  );
};
