import { isDefined } from '@rnw-community/shared';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ListRenderItemInfo, Pressable, FlatList, View } from 'react-native';

import { Column } from '../../../../components/column/column';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { ScreenTitle } from '../../../../components/screen-components/header-container/components/screen-title/screen-title';
import { HeaderContainer } from '../../../../components/screen-components/header-container/header-container';
import { ScreenContainer } from '../../../../components/screen-components/screen-container/screen-container';
import { SearchPanel } from '../../../../components/search-panel/search-panel';
import { Text } from '../../../../components/text/text';
import { EMPTY_STRING } from '../../../../constants/defaults';
import { ScreensEnum } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { getTokenSlug } from '../../../../utils/token.utils';
import { CollectibleImages } from '../../../wallet/components/collectibles/components/collectible-image';
import { IMAGE_CONTAINER_SIZE, IMAGE_SIZE } from '../../constants';
import { useGroupedCollectibles } from '../../hooks/use-grouped-collectibles.hook';

import { styles } from './collectibles-list.styles';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

export const CollectiblesList: FC = () => {
  const { goBack, navigate } = useNavigation();
  const { collectiblesList, groupedCollectibles } = useGroupedCollectibles();

  const [collectibles, setCollectibles] = useState<Token[]>(collectiblesList);
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  useEffect(() => {
    setCollectibles(collectiblesList);
  }, [collectiblesList]);

  useEffect(() => {
    const unifiedSearchValue = searchValue.toLowerCase().trim();

    const filteredCollectibles = collectiblesList.filter(nft => {
      if (isDefined(nft.collectionId)) {
        return isDefined(nft.contractName) && nft.contractName.toLowerCase().trim().includes(unifiedSearchValue);
      }

      return nft.name.toLowerCase().trim().includes(unifiedSearchValue);
    });

    setCollectibles(filteredCollectibles);

    if (searchValue === EMPTY_STRING) {
      setCollectibles(collectiblesList);
    }
  }, [searchValue, collectiblesList]);

  const navigateToAddNewNft = () => null;

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
      <Pressable
        key={getTokenSlug(nft.tokenAddress, nft.tokenId)}
        onPress={() => handleItemPress(nft)}
        style={[styles.nft, index % 2 === 0 && styles.marginRight]}
      >
        <View style={styles.imageWrapper}>
          {isDefined(nft.collectionId) ? (
            <Icon name={IconNameEnum.NftCollectionLayout} size={IMAGE_CONTAINER_SIZE} />
          ) : (
            <View style={styles.blockLayout} />
          )}
          <CollectibleImages
            collectible={nft}
            size={IMAGE_SIZE}
            onPress={() => handleItemPress(nft)}
            style={styles.imageContainer}
            imageStyle={styles.image}
          />
        </View>

        <Text style={styles.nftName}>{isDefined(nft.collectionId) ? nft.contractName : nft.name}</Text>
      </Pressable>
    ),
    [searchValue, groupedCollectibles]
  );

  return (
    <ScreenContainer>
      <HeaderContainer isSelectors>
        <ScreenTitle title="Collectibles" onBackButtonPress={goBack} />
      </HeaderContainer>

      <Column style={styles.root}>
        <SearchPanel
          onPressAddIcon={navigateToAddNewNft}
          setSearchValue={setSearchValue}
          isEmptyList={!collectibles.length}
        />

        <FlatList
          data={collectibles}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          style={styles.flatList}
        />
      </Column>
    </ScreenContainer>
  );
};
