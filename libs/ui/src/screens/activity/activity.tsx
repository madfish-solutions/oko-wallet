import React, { FC, useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

import { getDebankId } from '../../api/utils/get-debank-id.util';
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

const keyExtractor = ({ hash }: ActivityData) => hash;

export const Activity: FC = () => {
  const { navigate } = useNavigation();
  const selectedPublicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const { activity, fetchData } = useAllActivity(selectedPublicKeyHash, getDebankId(chainId));

  useEffect(() => {
    fetchData();
  }, []);

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  const renderItem = useCallback(
    ({ item: activityItems }: ListRenderItemInfo<ActivityData>) => (
      <ActivityList transaction={activityItems} address={selectedPublicKeyHash} chainName={getDebankId(chainId)} />
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
        keyExtractor={keyExtractor}
        ListEmptyComponent={<EmptySearchIcon />}
        onEndReachedThreshold={0.1}
        onEndReached={fetchData}
      />
      <NavigationBar />
    </ScreenContainer>
  );
};
