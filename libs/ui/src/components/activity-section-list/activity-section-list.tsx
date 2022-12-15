import React, { FC, useEffect } from 'react';
import { SectionList, SectionListData, SectionListRenderItem, View } from 'react-native';

import { getDebankId } from '../../api/utils/get-debank-id.util';
import { useAllActivity } from '../../hooks/use-activity.hook';
import { ActivityData, SectionListActivityData } from '../../interfaces/activity.interface';
import { ActivityList } from '../../screens/activity/components/activity-list';
import { getCustomSize } from '../../styles/format-size';
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

const keyExtractor = ({ hash }: ActivityData) => hash;

const emptyIconSize = getCustomSize(isWeb ? 30 : 36);

export const ActivitySectionList: FC<Props> = ({ publicKeyHash, chainId, tokenAddress = '' }) => {
  const { activity, fetchData, isLoading } = useAllActivity(publicKeyHash, getDebankId(chainId), tokenAddress);

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
      ListEmptyComponent={renderListEmptyComponent}
      onEndReachedThreshold={0.1}
      onEndReached={fetchData}
      stickySectionHeadersEnabled
    />
  );
};
