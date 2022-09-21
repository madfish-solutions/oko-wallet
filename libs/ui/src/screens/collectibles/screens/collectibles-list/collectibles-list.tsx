import { isDefined } from '@rnw-community/shared';
import React, { FC, useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { isMobile } from '../../../../utils/platform.utils';
import { CollectibleRenderItem } from '../../components/collectible-render-item/collectible-render-item';
import { ListContainer } from '../../components/list-container/list-container';
import { customNftContainerWidth } from '../../constants';
import { useCollectibleList } from '../../hooks/use-collectibles-list';
import { useGroupedCollectibles } from '../../hooks/use-grouped-collectibles.hook';

import { styles } from './collectibles-list.styles';

export const CollectiblesList: FC = () => {
  const { navigate } = useNavigation();
  const { collectiblesList, groupedCollectibles } = useGroupedCollectibles();

  const { collectibles, setSearchValue } = useCollectibleList(collectiblesList);

  const handleItemPress = useCallback(
    (collectible: Token) => {
      if (isDefined(collectible.collectionId) && isDefined(groupedCollectibles)) {
        return navigate(ScreensEnum.SpecificCollectiblesList, {
          collectibles: groupedCollectibles[collectible.collectionId]
        });
      }

      return navigate(ScreensEnum.Collectible, { collectible });
    },
    [groupedCollectibles]
  );

  const renderItem = useCallback(
    ({ item: collectible, index }: ListRenderItemInfo<Token>) => (
      <CollectibleRenderItem
        collectible={collectible}
        name={isDefined(collectible.collectionId) ? collectible.contractName ?? 'Collection' : collectible.name}
        handleItemPress={handleItemPress}
        index={index}
      >
        <View style={styles.layoutContainer}>
          {isDefined(collectible.collectionId) ? (
            <Icon name={IconNameEnum.NftCollectionLayout} size={isMobile ? customNftContainerWidth : '100%'} />
          ) : (
            <Icon
              name={IconNameEnum.NftLayout}
              size={isMobile ? customNftContainerWidth : '100%'}
              iconStyle={styles.layoutIcon}
            />
          )}
          <CollectibleImage
            artifactUri={collectible.artifactUri}
            size={isMobile ? customNftContainerWidth : '100%'}
            onPress={() => handleItemPress(collectible)}
            style={styles.imageContainer}
          />
        </View>
      </CollectibleRenderItem>
    ),
    [groupedCollectibles]
  );

  return (
    <ListContainer
      title="Collectibles"
      collectibles={collectibles}
      renderItem={renderItem}
      setSearchValue={setSearchValue}
    />
  );
};
