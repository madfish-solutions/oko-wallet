import React, { FC, useEffect } from 'react';
import { SectionList, SectionListData, SectionListRenderItem } from 'react-native';

import { getDebankId } from '../../api/utils/get-debank-id.util';
import { useAllActivity } from '../../hooks/use-activity.hook';
import { ActivityData, SectionListActivityData } from '../../interfaces/activity.interface';
import { ActivityList } from '../../screens/activity/components/activity-list';
import { EmptySearchIcon } from '../icon/components/empty-search-icon/empty-search-icon';
import { Row } from '../row/row';
import { Text } from '../text/text';

import { styles } from './activity-section-list.styles';

interface Props {
  publicKeyHash: string;
  chainId: string;
  tokenAddress?: string;
}

const keyExtractor = ({ hash }: ActivityData) => hash;

export const ActivitySectionList: FC<Props> = ({ publicKeyHash, chainId, tokenAddress = '' }) => {
  const { activity, fetchData } = useAllActivity(publicKeyHash, getDebankId(chainId), tokenAddress);

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem: SectionListRenderItem<ActivityData, SectionListActivityData> = ({ item: activityItems }) => (
    <ActivityList transaction={activityItems} address={publicKeyHash} chainName={getDebankId(chainId)} />
  );

  const renderSectionHeader = (item: { section: SectionListData<ActivityData, SectionListActivityData> }) => (
    <Row style={styles.dateWrapper}>
      <Text style={styles.dateText}>{item.section.title}</Text>
    </Row>
  );

  return (
    <SectionList
      sections={activity}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<EmptySearchIcon />}
      onEndReachedThreshold={0.1}
      onEndReached={fetchData}
      stickySectionHeadersEnabled
    />
  );
};
