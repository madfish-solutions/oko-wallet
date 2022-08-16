import React, { FC } from 'react';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreenScrollView } from '../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { useNavigation } from '../../hooks/use-navigation.hook';

import { ConnectToDapps as ConnectToDappsComponent } from './components/connect-to-dapps/connect-to-dapps';

export const ConnectToDapps: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Connect to Dapp" onBackButtonPress={goBack} />
      </HeaderContainer>

      <ScreenScrollView>
        <ConnectToDappsComponent />
      </ScreenScrollView>

      <NavigationBar />
    </ScreenContainer>
  );
};
