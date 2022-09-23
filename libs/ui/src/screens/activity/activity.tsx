import React, { FC } from 'react';

import { ActivitySectionList } from '../../components/activity-section-list/activity-section-list';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';

import { styles } from './activity.styles';

export const Activity: FC = () => {
  const { navigate } = useNavigation();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  return (
    <ScreenContainer style={styles.root}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Transactions" onBackButtonPress={navigateToWallet} />
      </HeaderContainer>
      <ActivitySectionList publicKeyHash={publicKeyHash} chainId={chainId} />
      <NavigationBar />
    </ScreenContainer>
  );
};
