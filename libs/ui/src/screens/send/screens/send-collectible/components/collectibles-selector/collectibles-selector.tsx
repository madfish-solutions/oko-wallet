import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { Announcement } from '../../../../../../components/announcement/announcement';
import { CollectibleImage } from '../../../../../../components/collectible-image/collectible-image';
import { Divider } from '../../../../../../components/divider/divider';
import { EmptySearchIcon } from '../../../../../../components/icon/components/empty-search-icon/empty-search-icon';
import { Icon } from '../../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../../components/icon/icon-name.enum';
import { Pressable } from '../../../../../../components/pressable/pressable';
import { Row } from '../../../../../../components/row/row';
import { Selector } from '../../../../../../components/selector/selector';
import { Text } from '../../../../../../components/text/text';
import { EMPTY_STRING } from '../../../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../../../enums/sreens.enum';
import { useFilterAccountTokens } from '../../../../../../hooks/use-filter-tokens.hook';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { Token } from '../../../../../../interfaces/token.interface';
import { ModalContainer } from '../../../../../../modals/components/modal-container/modal-container';
import {
  useCollectiblesSelector,
  useGasTokenSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../../../styles/format-size';
import { getTokenSlug } from '../../../../../../utils/token.utils';

import { styles } from './collectibles-selector.styles';

const keyExtractor = ({ tokenAddress, tokenId }: Token) => getTokenSlug(tokenAddress, tokenId);

const COLLECTIBLE_IMAGE_SIZE = getCustomSize(8.375);

export const CollectiblesSelector: FC = () => {
  const {
    params: { token }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendCollectiblesSelector>>();
  const { navigate } = useNavigation();

  const { name } = useSelectedNetworkSelector();
  const collectibles = useCollectiblesSelector();
  const accountCollectiblesWithBalance = useMemo(
    () => collectibles.filter(collectible => Number(collectible.balance.data) > 0),
    [collectibles]
  );
  const gasToken = useGasTokenSelector();

  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  const { accountTokens: accountCollectibles } = useFilterAccountTokens(accountCollectiblesWithBalance, searchValue);

  const selectedIndex = useMemo(
    () =>
      accountCollectibles.findIndex(
        accountCollectible =>
          accountCollectible.tokenAddress === token?.tokenAddress && accountCollectible.tokenId === token?.tokenId
      ),
    [accountCollectibles]
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<Token>) => {
    const isCollectibleSelected = selectedIndex === index;
    const onSelectItem = () => navigate(ScreensEnum.SendCollectible, { token: item });

    return (
      <Pressable onPress={onSelectItem}>
        <Row style={[styles.container, isCollectibleSelected && styles.selectedContainer]}>
          <Row style={styles.flex1}>
            <CollectibleImage artifactUri={item.artifactUri} size={COLLECTIBLE_IMAGE_SIZE} style={styles.nftImage} />
            <View style={styles.flex1}>
              <Row style={styles.nftNameContainer}>
                <Text numberOfLines={1} style={styles.nftName}>
                  {item.name}
                </Text>
                <Icon name={isCollectibleSelected ? IconNameEnum.SelectedCheckbox : IconNameEnum.EmptyCheckbox} />
              </Row>
              <Row style={styles.amountContainer}>
                <View>
                  <Text style={styles.greyText}>Amount</Text>
                  <Text style={styles.amountNumber}>{item.balance.data}</Text>
                </View>

                <Divider style={styles.divider} />
                <View>
                  <Text style={styles.greyText}>Collection</Text>
                  <Text numberOfLines={1} style={styles.collectionName}>
                    {item.contractName}
                  </Text>
                </View>
              </Row>
            </View>
          </Row>
        </Row>
      </Pressable>
    );
  };

  return (
    <ModalContainer screenTitle="Select Collectible">
      {!accountCollectibles.length && (
        <View>
          <EmptySearchIcon style={styles.emptySearchIcon} />
        </View>
      )}
      <Announcement text={`Collectibles only related to the current network: ${name}`} style={styles.warning} />
      <Selector
        data={accountCollectibles}
        renderItem={renderItem}
        setSearchValue={setSearchValue}
        selectedIndex={selectedIndex}
        selectedItemName={gasToken.symbol}
        keyExtractor={keyExtractor}
        isSearchInitiallyOpened
        isEmptyList={false}
      />
    </ModalContainer>
  );
};
