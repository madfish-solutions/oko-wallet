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
import { usePreviousScreenName } from '../../../hooks/use-previous-screen.hook';
import { Token as TokenType } from '../../../interfaces/token.interface';
import { useTokensMarketInfoSelector } from '../../../store/tokens-market-info/token-market-info.selectors';
import {
  useGasTokenSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector
} from '../../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../../utils/check-is-gas-token.util';
import { getDollarValue } from '../../../utils/get-dollar-amount.util';
import { getTokensWithBalance } from '../../../utils/get-tokens-with-balance.util';
import { getTokenMetadataSlug } from '../../../utils/token-metadata.util';
import { getTokenSlug } from '../../../utils/token.utils';
import { getFormattedBalance } from '../../../utils/units.utils';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './tokens-selector.styles';

const keyExtractor = ({ tokenAddress, tokenId }: TokenType) => getTokenSlug(tokenAddress, tokenId);

export const TokensSelector: FC = () => {
  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const {
    params: { token, field }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.TokensSelector>>();
  const { navigate } = useNavigation();
  const { chainId } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const previousScreen = usePreviousScreenName();
  const showOnlyTokenWithBalance = previousScreen === ScreensEnum.SendToken;

  const gasToken = useGasTokenSelector();
  const accountTokensWithBalanceAndGasToken: TokenType[] = useMemo(
    () => [gasToken, ...(showOnlyTokenWithBalance ? getTokensWithBalance(visibleAccountTokens) : visibleAccountTokens)],
    [gasToken, visibleAccountTokens, showOnlyTokenWithBalance]
  );

  const { accountTokens: filteredAccountTokens, setSearchValue } = useFilterAccountTokens(
    accountTokensWithBalanceAndGasToken
  );

  const selectedIndex = useMemo(
    () =>
      filteredAccountTokens.findIndex(
        accountToken => accountToken.tokenAddress === token?.tokenAddress && accountToken.tokenId === token?.tokenId
      ),
    [filteredAccountTokens]
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<TokenType>) => {
    const isTokenSelected = selectedIndex === index;

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
      if (previousScreen === ScreensEnum.Swap || previousScreen === ScreensEnum.SendToken) {
        navigate(previousScreen, { [field]: item });
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
        data={filteredAccountTokens}
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
