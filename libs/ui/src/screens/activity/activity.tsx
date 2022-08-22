import React, { FC } from 'react';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { TransactionStatusEnum } from '../../enums/transactions.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';

import { styles } from './activity.styles';
import { ActivityList } from './components/activity-list';

export const Activity: FC = () => {
  const { navigate } = useNavigation();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  return (
    <ScreenContainer style={styles.root}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Activity" onBackButtonPress={navigateToWallet} />
      </HeaderContainer>
      <NavigationBar />
      <ActivityList txStatus={TransactionStatusEnum.failed} />
    </ScreenContainer>
  );
};
