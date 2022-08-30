import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo, useState } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { IconWithBorderEnum } from '../../../../components/icon-with-border/enums';
import { Row } from '../../../../components/row/row';
import { RenderItem } from '../../../../components/selector/components/render-item/render-item';
import { Selector } from '../../../../components/selector/selector';
import { Text } from '../../../../components/text/text';
import { Token } from '../../../../components/token/token';
import { EMPTY_STRING } from '../../../../constants/defaults';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { Token as TokenType } from '../../../../interfaces/token.interface';
import { ModalContainer } from '../../../../modals/components/modal-container/modal-container';
import { useSelectedNetworkSelector, useVisibleAccountTokensSelector } from '../../../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../../../utils/token.utils';
import { formatUnits } from '../../../../utils/units.utils';
import { filterAccountTokensByValue } from '../../../tokens/utils/filter-account-tokens-by-value';

import { styles } from './tokens-selector.styles';

const keyExtractor = ({ tokenAddress, tokenId }: TokenType) => getTokenSlug(tokenAddress, tokenId);

export const TokensSelector: FC = () => {
  const {
    params: { selectedAsset }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendTokensSelector>>();
  const { navigate } = useNavigation();
  const { gasTokenMetadata, gasTokenBalance, rpcUrl } = useSelectedNetworkSelector();
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const accountTokensWithBalance = useMemo(
    () => visibleAccountTokens.filter(visibleAccountToken => Number(visibleAccountToken.balance.data) > 0),
    [visibleAccountTokens]
  );

  const gasToken = useMemo(() => ({ ...gasTokenMetadata, balance: gasTokenBalance } as TokenType), [rpcUrl]);

  const accountTokensWithBalanceAndGasToken: TokenType[] = useMemo(
    () => [gasToken, ...accountTokensWithBalance],
    [accountTokensWithBalance, gasToken]
  );

  const accountTokens = useMemo(() => {
    if (searchValue && accountTokensWithBalanceAndGasToken.length) {
      return filterAccountTokensByValue(accountTokensWithBalanceAndGasToken, searchValue);
    }

    return accountTokensWithBalanceAndGasToken;
  }, [searchValue, accountTokensWithBalanceAndGasToken]);

  const selectedIndex = useMemo(
    () =>
      accountTokens.findIndex(
        token => token.tokenAddress === selectedAsset?.tokenAddress && token.tokenId === selectedAsset?.tokenId
      ),
    [accountTokens]
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<TokenType>) => {
    const isTokenSelected = selectedIndex === index;
    const isGasToken = !item.tokenAddress;
    const balance = formatUnits(item.balance.data, item.decimals);

    const onSelectItem = () => navigate(ScreensEnum.Send, { selectedAsset: item });

    return (
      <RenderItem
        style={styles.renderItem}
        isActive={isTokenSelected}
        onSelectItem={onSelectItem}
        leftTopComponent={
          <Token
            iconType={IconWithBorderEnum.Ternary}
            symbol={item.symbol}
            gasToken={isGasToken}
            uri={item.thumbnailUri}
            forceHideTokenName
            symbolStyle={styles.symbol}
          />
        }
        leftBottomComponent={
          <View>
            <Row style={styles.dollarContainer}>
              <Text style={styles.dollarAmount}>1234</Text>
              <Text style={styles.dollarSign}>$</Text>
            </Row>

            <Text style={styles.amount}>{balance}</Text>
          </View>
        }
      />
    );
  };

  return (
    <ModalContainer screenTitle="Select Token From">
      <Selector
        data={accountTokens}
        renderItem={renderItem}
        setSearchValue={setSearchValue}
        selectedIndex={selectedIndex}
        selectedItemName={gasToken.symbol}
        keyExtractor={keyExtractor}
        isSearchInitiallyOpened
      />
    </ModalContainer>
  );
};
