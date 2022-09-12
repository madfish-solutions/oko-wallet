import React, { FC } from 'react';

import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { useCollectiblesSelector } from '../../store/wallet/wallet.selectors';

export const Collectibles: FC = () => {
  const { goBack } = useNavigation();
  const collectibles = useCollectiblesSelector();

  console.log('all collectibles', collectibles);

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Collectibles" onBackButtonPress={goBack} />
      </HeaderContainer>
    </ScreenContainer>
  );
};
