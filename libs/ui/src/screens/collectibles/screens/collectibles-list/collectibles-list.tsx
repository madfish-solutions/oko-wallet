import { isDefined } from '@rnw-community/shared';
import React, { FC, useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { ListContainer } from '../../components/list-container/list-container';
import { NftRenderItem } from '../../components/nft-render-item/nft-render-item';
import { IMAGE_CONTAINER_SIZE, IMAGE_SIZE } from '../../constants';
import { useGroupedCollectibles } from '../../hooks/use-grouped-collectibles.hook';
import { usePageDataProcessing } from '../../hooks/use-page-data-processing.hook';

import { styles } from './collectibles-list.styles';

export const CollectiblesList: FC = () => {
  const { navigate } = useNavigation();
  const { collectiblesList, groupedCollectibles } = useGroupedCollectibles();

  const { collectibles, setSearchValue } = usePageDataProcessing(collectiblesList);

  const handleItemPress = useCallback(
    (nft: Token) => {
      if (isDefined(nft.collectionId) && isDefined(groupedCollectibles)) {
        return navigate(ScreensEnum.SpicificCollectiblesList, { collectibles: groupedCollectibles[nft.collectionId] });
      }

      return navigate(ScreensEnum.NFT, { nft });
    },
    [groupedCollectibles]
  );

  const renderItem = useCallback(
    ({ item: nft, index }: ListRenderItemInfo<Token>) => (
      <NftRenderItem
        nft={nft}
        name={isDefined(nft.collectionId) ? nft.contractName ?? 'Collection' : nft.name}
        handleItemPress={handleItemPress}
        index={index}
      >
        {isDefined(nft.collectionId) ? (
          <Icon name={IconNameEnum.NftCollectionLayout} size={IMAGE_CONTAINER_SIZE} />
        ) : (
          <View style={styles.blockLayout} />
        )}
        <CollectibleImage
          artifactUri={nft.artifactUri}
          size={IMAGE_SIZE}
          onPress={() => handleItemPress(nft)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        />
      </NftRenderItem>
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
