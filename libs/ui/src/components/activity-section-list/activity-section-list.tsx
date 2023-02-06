import debounce from 'lodash/debounce';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
import { ActivityData, SectionListActivityData } from '../../interfaces/activity-data.interface';
import { ActivityFilterEnum } from '../../modals/screens/activity-filter-selector/activity-filter.enum';
import { ActivityItem } from '../../screens/activity/components/activity-item';
import { getCustomSize } from '../../styles/format-size';
import { getFilteredActivity } from '../../utils/filter-activity.util';
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
  filterTypeName?: ActivityFilterEnum;
  tokenAddress?: string;
}

const keyExtractor = ({ hash, timestamp }: ActivityData) => `${hash}_${timestamp}`;

const renderItem: SectionListRenderItem<ActivityData, SectionListActivityData> = ({ item }) => (
  <ActivityItem transaction={item} />
);

const renderSectionHeader = (item: { section: SectionListData<ActivityData, SectionListActivityData> }) => (
  <Row style={styles.dateWrapper}>
    <Text style={styles.dateText}>{item.section.title}</Text>
  </Row>
);

const emptyIconSize = getCustomSize(isWeb ? 30 : 36);

const MAX_ACTIVITY_ATTEMPTS = 10;
let numberOfAttempts = 0;

export const ActivitySectionList: FC<Props> = ({ publicKeyHash, chainId, filterTypeName, tokenAddress = '' }) => {
  const [offsetY, setOffsetY] = useState(0);
  const { activity: allActivity, fetch, isLoading } = useAllActivity(publicKeyHash, getDebankId(chainId), tokenAddress);
  const extraData = useMemo(() => [publicKeyHash, chainId], [publicKeyHash, chainId]);

  const activity = useMemo(() => getFilteredActivity(allActivity, filterTypeName), [allActivity, filterTypeName]);

  useEffect(() => {
    console.log('activity', activity);
  }, [activity]);

  useEffect(() => {
    if (
      filterTypeName !== ActivityFilterEnum.AllActivity &&
      allActivity.length > 0 &&
      activity.length === 0 &&
      numberOfAttempts <= MAX_ACTIVITY_ATTEMPTS
    ) {
      const lastDate = allActivity.slice(-1)[0].data.slice(-1)[0].timestamp;

      fetch(1, lastDate);
      numberOfAttempts += 1;
    }
  }, [filterTypeName, allActivity, activity]);

  const handleFetchData = () => {
    if (offsetY === 0) {
      fetch(2, 0);
      numberOfAttempts = 0;
    }
  };

  useTimerEffect(handleFetchData, DATA_UPDATE_TIME, [publicKeyHash, chainId, offsetY]);

  const handleScrollWeb = useCallback(
    debounce((event: NativeSyntheticEvent<NativeScrollEvent>) => {
      console.log('debounce', event.nativeEvent.contentOffset.y);
      setOffsetY(event.nativeEvent.contentOffset.y);
    }, DEBOUNCE_TIME),
    []
  );

  const handleScrollMobile = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.persist();
    debounce(() => setOffsetY(event.nativeEvent.contentOffset.y), DEBOUNCE_TIME);
  };

  const handleEndReached = () => fetch(3);

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
      extraData={extraData}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      // ListFooterComponent={renderListFooterComponent}
      keyExtractor={keyExtractor}
      onScroll={
        isWeb
          ? event => {
              console.log('onScroll', event.nativeEvent.contentOffset.y);
              handleScrollWeb(event);
            }
          : handleScrollMobile
      }
      // getItemLayout={getItemLayout}
      ListEmptyComponent={renderListEmptyComponent}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
      stickySectionHeadersEnabled
    />
  );
};
