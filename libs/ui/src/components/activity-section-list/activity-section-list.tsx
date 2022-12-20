import debounce from 'lodash/debounce';
import React, { FC, useCallback, useState } from 'react';
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
import { ActivityData, SectionListActivityData } from '../../interfaces/activity.interface';
import { ActivityList } from '../../screens/activity/components/activity-list';
import { getCustomSize } from '../../styles/format-size';
import { getItemLayoutSectionList } from '../../utils/get-item-layout-section-list.util';
import { isWeb } from '../../utils/platform.utils';
import { EmptySearchIcon } from '../icon/components/empty-search-icon/empty-search-icon';
import { IconNameEnum } from '../icon/icon-name.enum';
import { LoaderSizeEnum } from '../loader/enums';
import { Loader } from '../loader/loader';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './activity-section-list.styles';

interface Props {
  publicKeyHash: string;
  chainId: string;
  tokenAddress?: string;
}

const keyExtractor = ({ hash, timestamp }: ActivityData) => `${hash}_${timestamp}`;

const renderSectionHeader = (item: { section: SectionListData<ActivityData, SectionListActivityData> }) => (
  <Row style={styles.dateWrapper}>
    <Text style={styles.dateText}>{item.section.title}</Text>
  </Row>
);

const emptyIconSize = getCustomSize(isWeb ? 30 : 36);

export const ActivitySectionList: FC<Props> = ({ publicKeyHash, chainId, tokenAddress = '' }) => {
  const [offsetY, setOffsetY] = useState(0);
  const { activity, fetchData, isLoading } = useAllActivity(publicKeyHash, getDebankId(chainId), tokenAddress);

  useTimerEffect(() => fetchData(0), DATA_UPDATE_TIME, [publicKeyHash, chainId, offsetY], offsetY);

  const handleScroll = debounce((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setOffsetY(event.nativeEvent.contentOffset.y);
  }, DEBOUNCE_TIME);

  const handleEndReached = () => {
    fetchData();
  };

  const renderItem: SectionListRenderItem<ActivityData, SectionListActivityData> = useCallback(
    ({ item: activityItems }) => (
      <ActivityList transaction={activityItems} address={publicKeyHash} chainName={getDebankId(chainId)} />
    ),
    [publicKeyHash, chainId]
  );

  const getItemLayout = getItemLayoutSectionList<ActivityData, SectionListActivityData>(getCustomSize(9));

  const renderListFooterComponent = () => (
    <>
      {isLoading && (
        <View style={styles.loading}>
          <Loader iconName={IconNameEnum.LoaderSnake} size={LoaderSizeEnum.Large} />
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
      onScroll={handleScroll}
      getItemLayout={getItemLayout}
      ListEmptyComponent={renderListEmptyComponent}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
      stickySectionHeadersEnabled
    />
  );
};
