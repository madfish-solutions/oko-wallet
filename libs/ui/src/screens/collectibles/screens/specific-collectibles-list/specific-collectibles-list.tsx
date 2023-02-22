import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import React, { FC, useCallback, useEffect } from 'react';
import { ListRenderItemInfo } from 'react-native';

import { CollectibleImage } from '../../../../components/collectible-image/collectible-image';
import { Column } from '../../../../components/column/column';
import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Text } from '../../../../components/text/text';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token } from '../../../../interfaces/token.interface';
import {
  usePendingCollectiblesTransactionsSelector,
  useSelectedCollectionSelector
} from '../../../../store/wallet/wallet.selectors';
import { CollectibleRenderItem } from '../../components/collectible-render-item/collectible-render-item';
import { ListContainer } from '../../components/list-container/list-container';
import { COLLECTIBLE_SIZE } from '../../constants';
import { useCollectibleList } from '../../hooks/use-collectibles-list';

import { styles } from './specific-collectibles-list.styles';

export const SpecificCollectiblesList: FC = () => {
  const {
    params: { collectionName }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SpecificCollectiblesList>>();
  const { navigate, goBack } = useNavigation();

  const collectiblesList = useSelectedCollectionSelector(collectionName);
  const pendingCollectiblesTransactions = usePendingCollectiblesTransactionsSelector();

  const { collectibles, setSearchValue } = useCollectibleList(collectiblesList);

  const handleItemPress = (collectible: Token) => navigate(ScreensEnum.Collectible, { collectible });

  useEffect(() => {
    if (collectiblesList.length === 0) {
      goBack();
    }
  }, [collectiblesList.length]);

  const renderItem = useCallback(
    ({ item: collectible, index }: ListRenderItemInfo<Token>) => {
      const pendingTransaction = pendingCollectiblesTransactions.find(
        ({ token: { tokenId, tokenAddress } }) =>
          tokenAddress === collectible.tokenAddress && tokenId === collectible.tokenId
      );

      return (
        <CollectibleRenderItem
          collectible={collectible}
          name={collectible.name}
          handleItemPress={handleItemPress}
          index={index}
        >
          <Icon name={IconNameEnum.NftLayout} size={COLLECTIBLE_SIZE} />

          <CollectibleImage
            artifactUri={collectible.artifactUri}
            size={COLLECTIBLE_SIZE}
            onPress={() => handleItemPress(collectible)}
            isPending={isDefined(pendingTransaction)}
            style={styles.imageContainer}
          />
        </CollectibleRenderItem>
      );
    },
    [pendingCollectiblesTransactions]
  );

  return (
    <ListContainer
      title={collectionName}
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
