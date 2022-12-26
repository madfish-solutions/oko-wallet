import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC } from 'react';

import { ActivitySectionList } from '../../components/activity-section-list/activity-section-list';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Row } from '../../components/row/row';
import { ScreenTitle } from '../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../components/screen-components/screen-container/screen-container';
import { Text } from '../../components/text/text';
import { TouchableIcon } from '../../components/touchable-icon/touchable-icon';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { ACTIVITIES_TYPES } from '../../modals/screens/activity-filter-selector/constants';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';

import { styles } from './activity.styles';

export const Activity: FC = () => {
  const { params } = useRoute<RouteProp<ScreensParamList, ScreensEnum.Activity>>();

  const { navigate } = useNavigation();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const { chainId } = useSelectedNetworkSelector();

  const navigateToWallet = () => navigate(ScreensEnum.Wallet);
  const openActivityFilters = () =>
    navigate(ScreensEnum.ActivityFilterSelector, { filterType: params?.filterType ?? ACTIVITIES_TYPES[0] });

  const iconName = isDefined(params)
    ? params?.filterType.id === ACTIVITIES_TYPES[0].id
      ? IconNameEnum.FilterNo
      : IconNameEnum.FilterYes
    : IconNameEnum.FilterNo;

  return (
    <ScreenContainer style={styles.root}>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Transactions" onBackButtonPress={navigateToWallet} />
      </HeaderContainer>
      <Row style={styles.panel}>
        <Text style={styles.filterName}>{params?.filterType.title ?? ACTIVITIES_TYPES[0].title}</Text>
        <TouchableIcon name={iconName} onPress={openActivityFilters} />
      </Row>
      <ActivitySectionList publicKeyHash={publicKeyHash} chainId={chainId} />
      <NavigationBar />
    </ScreenContainer>
  );
};
