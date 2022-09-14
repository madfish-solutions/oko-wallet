import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';

export const SpecificCollectiblesList: FC = () => {
  const {
    params: { collectibles }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SpicificCollectiblesList>>();
  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title={collectibles[0].contractName ?? 'Collection'} onBackButtonPress={goBack} />
      </HeaderContainer>
    </ScreenContainer>
  );
};
