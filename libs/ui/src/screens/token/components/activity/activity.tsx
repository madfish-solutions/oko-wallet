import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useCallback, useEffect } from 'react';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';

import { EmptySearchIcon } from '../../../../components/icon/components/empty-search-icon/empty-search-icon';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useAllActivity } from '../../../../hooks/use-activity.hook';
import { ActivityData } from '../../../../interfaces/activity.interface';
import { ActivityList } from '../../../../screens/activity/components/activity-list';
import { getDebankId } from '../../../../screens/activity/utils/activity.utils';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';

import { styles } from './activity.styles';

export const Activity: FC = () => {
  const {
    params: {
      token: { tokenAddress }
    }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Token>>();
  const selectedPublicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const { activity, fetchMoreData } = useAllActivity(selectedPublicKeyHash, getDebankId(chainId), tokenAddress);

  useEffect(() => {
    fetchMoreData();
  }, []);

  const renderItem = useCallback(
    ({ item: activityItems }: ListRenderItemInfo<ActivityData>) => (
      <ActivityList transaction={activityItems} address={selectedPublicKeyHash} chainName={getDebankId(chainId)} />
    ),
    []
  );

  return (
    <ScrollView style={styles.root}>
      <FlatList
        data={activity}
        renderItem={renderItem}
        keyExtractor={({ hash }) => hash}
        ListEmptyComponent={<EmptySearchIcon />}
        onEndReachedThreshold={0.1}
        onEndReached={fetchMoreData}
      />
    </ScrollView>
  );
};
