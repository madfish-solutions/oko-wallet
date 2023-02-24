import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { IconWithBorderEnum } from '../../../components/icon-with-border/enums';
import { Row } from '../../../components/row/row';
import { RenderItem } from '../../../components/selector/components/render-item/render-item';
import { Selector } from '../../../components/selector/selector';
import { Text } from '../../../components/text/text';
import { Token } from '../../../components/token/token';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useFilterAccountTokens } from '../../../hooks/use-filter-tokens.hook';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { usePreviousScreenName } from '../../../hooks/use-previous-screen-name.hook';
import { useSearchNewToken } from '../../../hooks/use-search-new-token.hook';
import { useSortAccountTokensByBalance } from '../../../hooks/use-sort-tokens-by-balance.hook';
import { Token as TokenType } from '../../../interfaces/token.interface';
import { useAddNewTokenToAccount } from '../../../screens/tokens/hooks/use-add-new-token-to-account.hook';
import { useTokensMarketInfoSelector } from '../../../store/tokens-market-info/token-market-info.selectors';
import {
  useGasTokenSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensAndGasTokenSelector
} from '../../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getDollarValue } from '../../../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../../../utils/token-metadata.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { getFormattedBalance } from '../../../utils/units.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './tokens-selector.styles';

const keyExtractor = ({ tokenAddress, tokenId }: TokenType) => getTokenSlug(tokenAddress, tokenId);

export const TokensSelector: FC = () => {
  const {
    params: { token, navigationKey }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.TokensSelector>>();
  const { navigate } = useNavigation();
  const previousScreen = usePreviousScreenName();

  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const gasToken = useGasTokenSelector();
  const { chainId } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensAndGasTokenSelector();

  const { newToken, searchValue, setSearchValue, isLoadingMetadata } = useSearchNewToken();
  const { addNewTokenToAccount } = useAddNewTokenToAccount();

  const { accountTokens: filteredAccountTokens } = useFilterAccountTokens(visibleAccountTokens, searchValue, newToken);

  const sortedTokens = useSortAccountTokensByBalance(filteredAccountTokens);

  const selectedIndex = useMemo(
    () =>
      sortedTokens.findIndex(
        accountToken =>
          getTokenSlug(accountToken.tokenAddress, accountToken.tokenId) ===
          getTokenSlug(token?.tokenAddress ?? '', token?.tokenId)
      ),
    [sortedTokens]
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<TokenType>) => {
    const isTokenSelected = selectedIndex === index;
    const isNewToken = item.tokenAddress === newToken?.tokenAddress;

    const {
      tokenAddress,
      balance: { data: amount },
      decimals,
      tokenId
    } = item;

    const isGasToken = checkIsGasToken(tokenAddress);
    const balance = getFormattedBalance(amount, decimals);
    const tokenMetadataSlug = getTokenMetadataSlug(chainId, tokenAddress, tokenId);
    const { price } = allTokensMarketInfoSelector[tokenMetadataSlug] ?? {};
    const amountInDollar = getDollarValue({ amount, price, decimals });

    const onSelectItem = () => {
      addNewTokenToAccount(item, isNewToken);

      if (previousScreen === ScreensEnum.Swap || previousScreen === ScreensEnum.SendToken) {
        navigate(previousScreen, { [navigationKey]: item });
      }
    };

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
              <Text style={styles.dollarAmount}>{amountInDollar}</Text>
              <Text style={styles.dollarSign}>$</Text>
            </Row>

            <Text style={styles.amount}>{balance}</Text>
          </View>
        }
      />
    );
  };

  return (
    <ModalContainer screenTitle="Select Token">
      <Selector
        data={sortedTokens}
        renderItem={renderItem}
        setSearchValue={setSearchValue}
        selectedIndex={selectedIndex}
        selectedItemName={gasToken.symbol}
        keyExtractor={keyExtractor}
        isLoading={isLoadingMetadata}
        placeholder="Search by name or address"
        isSearchInitiallyOpened
      />
    </ModalContainer>
  );
};
