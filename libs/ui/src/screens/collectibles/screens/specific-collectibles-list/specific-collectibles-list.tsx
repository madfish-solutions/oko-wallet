import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { ListRenderItemInfo } from 'react-native';

import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Column } from '../../../../components/column/column';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Text } from '../../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { isMobile } from '../../../../utils/platform.utils';
import { CollectibleRenderItem } from '../../components/collectible-render-item/collectible-render-item';
import { ListContainer } from '../../components/list-container/list-container';
import { customNftContainerWidth } from '../../constants';
import { useCollectibleList } from '../../hooks/use-collectibles-list';

import { styles } from './specific-collectibles-list.styles';

export const SpecificCollectiblesList: FC = () => {
  const {
    params: { collectibles: collectiblesList }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SpecificCollectiblesList>>();
  const { navigate } = useNavigation();

  const { collectibles, setSearchValue } = useCollectibleList(collectiblesList, true);

  const handleItemPress = (collectible: Token) => navigate(ScreensEnum.Collectible, { collectible });

  const renderItem = useCallback(
    ({ item: collectible, index }: ListRenderItemInfo<Token>) => (
      <CollectibleRenderItem
        collectible={collectible}
        name={collectible.name}
        handleItemPress={handleItemPress}
        index={index}
      >
        <Icon name={IconNameEnum.NftLayout} size={isMobile ? customNftContainerWidth : '100%'} />

        <CollectibleImage
          artifactUri={collectible.artifactUri}
          size={isMobile ? customNftContainerWidth : '100%'}
          onPress={() => handleItemPress(collectible)}
          style={styles.imageContainer}
        />
      </CollectibleRenderItem>
    ),
    []
  );

  return (
    <ListContainer
      title={collectiblesList[0].contractName ?? 'Collection'}
      collectibles={collectibles}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
    >
      <Column style={styles.amountWrapper}>
        <Text style={styles.headerText}>Amount</Text>
        <Text style={styles.amount}>{collectiblesList.length}</Text>
      </Column>
    </ListContainer>
  );
};
