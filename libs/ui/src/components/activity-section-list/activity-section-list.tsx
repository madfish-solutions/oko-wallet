import { isDefined } from '@rnw-community/shared';
import debounce from 'lodash/debounce';
import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  View
} from 'react-native';

import { getDebankId } from '../../api/utils/get-debank-id.util';
import { DEBOUNCE_TIME } from '../../constants/defaults';
import { DATA_UPDATE_TIME } from '../../constants/update-time';
import { useAllActivity } from '../../hooks/use-activity.hook';
import { useTimerEffect } from '../../hooks/use-timer-effect.hook';
import { ActivityData, SectionListActivityData, TransactionTypeEnum } from '../../interfaces/activity.interface';
import { ActivityFilterEnum } from '../../modals/screens/activity-filter-selector/activity-filter.enum';
import { ActivityItem } from '../../screens/activity/components/activity-item';
import { getCustomSize } from '../../styles/format-size';
import { getItemLayoutSectionList } from '../../utils/get-item-layout-section-list.util';
import { isWeb } from '../../utils/platform.utils';
import { EmptySearchIcon } from '../icon/components/empty-search-icon/empty-search-icon';
import { LoaderSizeEnum } from '../loader/enums';
import { Loader } from '../loader/loader';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './activity-section-list.styles';

interface Props {
  publicKeyHash: string;
  chainId: string;
  filterType?: string;
  tokenAddress?: string;
}

const keyExtractor = ({ hash, timestamp }: ActivityData) => `${hash}_${timestamp}`;

const getItemLayout = getItemLayoutSectionList<ActivityData, SectionListActivityData>(getCustomSize(9));

const renderSectionHeader = (item: { section: SectionListData<ActivityData, SectionListActivityData> }) => (
  <Row style={styles.dateWrapper}>
    <Text style={styles.dateText}>{item.section.title}</Text>
  </Row>
);

const emptyIconSize = getCustomSize(isWeb ? 30 : 36);

export const ActivitySectionList: FC<Props> = ({ publicKeyHash, chainId, filterType, tokenAddress = '' }) => {
  const [offsetY, setOffsetY] = useState(0);
  const { activity: allActivity, fetch, isLoading } = useAllActivity(publicKeyHash, getDebankId(chainId), tokenAddress);

  const [activity, setActivity] = useState(allActivity);

  const handleFetchData = () => {
    if (offsetY === 0) {
      fetch(0);
    }
  };

  const filterActivity = (condition: (activity: ActivityData) => boolean) => {
    setActivity(
      allActivity
        .map(item => ({
          title: item.title,
          data: item.data.filter(activity => condition(activity))
        }))
        .filter(item => item.data.length)
    );
  };

  useEffect(() => {
    if (isDefined(filterType)) {
      switch (filterType) {
        case ActivityFilterEnum.Send: {
          return filterActivity(activity => activity.type === TransactionTypeEnum.Send);
        }
        case ActivityFilterEnum.Receive: {
          return filterActivity(activity => activity.type === TransactionTypeEnum.Receive);
        }
        case ActivityFilterEnum.ContractInteraction: {
          return filterActivity(activity => activity.type === TransactionTypeEnum.ContractInteraction);
        }
        case ActivityFilterEnum.Collectibles: {
          return filterActivity(activity => activity.isCollectible ?? false);
        }
        case ActivityFilterEnum.AllActivity: {
          return setActivity(allActivity);
        }
      }
    } else {
      setActivity(allActivity);
    }
  }, [filterType, allActivity]);

  useTimerEffect(handleFetchData, DATA_UPDATE_TIME, [publicKeyHash, chainId, offsetY]);

  const handleScrollWeb = debounce((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setOffsetY(event.nativeEvent.contentOffset.y);
  }, DEBOUNCE_TIME);

  const handleScrollMobile = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.persist();
    debounce(() => setOffsetY(event.nativeEvent.contentOffset.y), DEBOUNCE_TIME);
  };

  const handleEndReached = () => {
    fetch();
  };

  const renderItem: SectionListRenderItem<ActivityData, SectionListActivityData> = useCallback(
    ({ item }) => <ActivityItem transaction={item} address={publicKeyHash} chainName={getDebankId(chainId)} />,
    [publicKeyHash, chainId]
  );

  const renderListFooterComponent = () => (
    <>
      {isLoading && (
        <View style={styles.loading}>
          <Loader size={LoaderSizeEnum.Large} />
        </View>
      )}
    </>
  );

  const renderListEmptyComponent = () => <>{!isLoading && <EmptySearchIcon size={emptyIconSize} />}</>;

  return (
    <SectionList
      sections={activity}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ListFooterComponent={renderListFooterComponent}
      keyExtractor={keyExtractor}
      onScroll={isWeb ? handleScrollWeb : handleScrollMobile}
      getItemLayout={getItemLayout}
      ListEmptyComponent={renderListEmptyComponent}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
      stickySectionHeadersEnabled
    />
  );
};
