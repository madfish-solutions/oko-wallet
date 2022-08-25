import React, { FC, useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { EmptySearchIcon } from '../../components/icon/components/empty-search-icon/empty-search-icon';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { ScreensEnum } from '../../enums/sreens.enum';
import { useAllActivity } from '../../hooks/use-activity.hook';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { ActivityData } from '../../interfaces/activity.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';

import { styles } from './activity.styles';
import { ActivityList } from './components/activity-list';

export const Activity: FC = () => {
  const { navigate } = useNavigation();
  const selectedPublicKey = useSelectedAccountPublicKeyHashSelector();
  const {
    gasTokenMetadata: { symbol }
  } = useSelectedNetworkSelector();

  const { activity, fetchActivity } = useAllActivity(selectedPublicKey, symbol.toLowerCase());

  useEffect(() => {
    fetchActivity();
  }, [selectedPublicKey]);

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  const renderItem = useCallback(
    ({ item: activity }: ListRenderItemInfo<ActivityData>) => (
      <ActivityList transaction={activity} address={selectedPublicKey} />
    ),
    []
  );

  return (
    <ScreenContainer style={styles.root}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Transactions" onBackButtonPress={navigateToWallet} />
      </HeaderContainer>

      <FlatList
        data={activity}
        renderItem={renderItem}
        keyExtractor={({ hash }) => hash}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptySearchIcon />}
      />
      <NavigationBar />
    </ScreenContainer>
  );
};
