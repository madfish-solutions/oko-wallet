import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Column } from '../../../../components/column/column';
import { Text } from '../../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import { getCustomSize } from '../../../../styles/format-size';
import { ListContainer } from '../../components/list-container/list-container';
import { NftRenderItem } from '../../components/nft-render-item/nft-render-item';
import { IMAGE_CONTAINER_SIZE } from '../../constants';
import { usePageDataProcessing } from '../../hooks/use-page-data-processing.hook';

import { styles } from './specific-collectibles-list.styles';

export const SpecificCollectiblesList: FC = () => {
  const {
    params: { collectibles: collectiblesList }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SpecificCollectiblesList>>();
  const { navigate } = useNavigation();

  const { collectibles, setSearchValue } = usePageDataProcessing(collectiblesList, true);

  const handleItemPress = (nft: Token) => navigate(ScreensEnum.NFT, { nft });

  const renderItem = useCallback(
    ({ item: nft, index }: ListRenderItemInfo<Token>) => (
      <NftRenderItem nft={nft} name={nft.name} handleItemPress={handleItemPress} index={index}>
        <View style={styles.blockLayout} />

        <CollectibleImage
          artifactUri={nft.artifactUri}
          size={IMAGE_CONTAINER_SIZE}
          height={getCustomSize(20.5)}
          onPress={() => handleItemPress(nft)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        />
      </NftRenderItem>
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
