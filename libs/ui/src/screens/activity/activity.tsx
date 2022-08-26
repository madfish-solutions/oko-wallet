import React, { FC, useCallback, useEffect, useState } from 'react';
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

const startTime = Date.now();

export const Activity: FC = () => {
  const { navigate } = useNavigation();
  const selectedPublicKey = useSelectedAccountPublicKeyHashSelector();
  const {
    gasTokenMetadata: { symbol }
  } = useSelectedNetworkSelector();
  const [activity, setActivity] = useState<ActivityData[]>([]);

  const { fetchActivity, lastTimestamp } = useAllActivity(selectedPublicKey, symbol.toLowerCase());

  useEffect(() => {
    (async () => {
      const firstActivity = await fetchActivity(startTime);
      if (firstActivity !== undefined) {
        setActivity(firstActivity);
      }
    })();
  }, []);

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);

  const fetchMoreData = useCallback(() => {
    (async () => {
      const newActivity = await fetchActivity(lastTimestamp);
      if (newActivity !== undefined) {
        setActivity([...activity, ...newActivity]);
      }
    })();
  }, [lastTimestamp]);

  const renderItem = useCallback(
    ({ item: activityItems }: ListRenderItemInfo<ActivityData>) => (
      <ActivityList transaction={activityItems} address={selectedPublicKey} />
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
        ListEmptyComponent={<EmptySearchIcon />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
      />
      <NavigationBar />
    </ScreenContainer>
  );
};
