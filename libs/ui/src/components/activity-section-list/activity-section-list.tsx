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
import ActivityItem from '../../screens/activity/components/activity-item';
import { getCustomSize } from '../../styles/format-size';
import { getFilteredActivity } from '../../utils/filter-activity.util';
import { isMobile, isWeb } from '../../utils/platform.utils';
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

const keyExtractor = ({ hash }: ActivityData) => hash;

const renderSectionHeader = (item: { section: SectionListData<ActivityData, SectionListActivityData> }) => (
  <Row style={styles.dateWrapper}>
    <Text style={styles.dateText}>{item.section.title}</Text>
  </Row>
);

const renderItem: SectionListRenderItem<ActivityData, SectionListActivityData> = ({ item }) => (
  <ActivityItem
    key={item.hash}
    hash={item.hash}
    label={item.label}
    status={item.status}
    timestamp={item.timestamp}
    amount={item.amount}
    projectName={item.projectName}
    symbol={item.symbol}
    transfer={item.transfer}
    type={item.type}
  />
);

const emptyIconSize = getCustomSize(isWeb ? 30 : 36);

const MAX_ACTIVITY_ATTEMPTS = 10;
const API_MAX_RESPONSE_LENGTH = 20;
let numberOfAttempts = 0;

export const ActivitySectionList: FC<Props> = ({ publicKeyHash, chainId, filterTypeName, tokenAddress = '' }) => {
  const [offsetY, setOffsetY] = useState(0);
  const { activity: allActivity, fetch, isLoading } = useAllActivity(publicKeyHash, getDebankId(chainId), tokenAddress);

  const activity = useMemo(() => getFilteredActivity(allActivity, filterTypeName), [allActivity, filterTypeName]);

  const activityDataLength = useMemo(() => {
    let sum = 0;

    for (const { data } of activity) {
      sum += data.length;
    }

    return sum;
  }, [activity]);

  useEffect(() => {
    if (
      filterTypeName !== ActivityFilterEnum.AllActivity &&
      allActivity.length > 0 &&
      activity.length === 0 &&
      numberOfAttempts <= MAX_ACTIVITY_ATTEMPTS
    ) {
      const lastDate = allActivity.slice(-1)[0].data.slice(-1)[0].timestamp;

      fetch(lastDate);
      numberOfAttempts += 1;
    }
  }, [filterTypeName, allActivity, activity]);

  const handleFetchData = () => {
    if (offsetY === 0 && activityDataLength <= API_MAX_RESPONSE_LENGTH) {
      fetch(0);
      numberOfAttempts = 0;
    }
  };

  useTimerEffect(handleFetchData, DATA_UPDATE_TIME, [publicKeyHash, chainId, offsetY, activityDataLength]);

  const handleScroll = debounce(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => setOffsetY(event.nativeEvent.contentOffset.y),
    DEBOUNCE_TIME
  );

  const handleScrollMobile = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.persist();
    handleScroll(event);
  }, []);

  const handleEndReached = () => {
    fetch();
  };

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
      initialNumToRender={isMobile ? 10 : 3}
      ListFooterComponent={renderListFooterComponent}
      keyExtractor={keyExtractor}
      onScroll={isWeb ? handleScroll : handleScrollMobile}
      ListEmptyComponent={renderListEmptyComponent}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
      stickySectionHeadersEnabled
    />
  );
};
