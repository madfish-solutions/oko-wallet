import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useMemo } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import { IconWithBorderEnum } from '../../../../../../components/icon-with-border/enums';
import { Row } from '../../../../../../components/row/row';
import { RenderItem } from '../../../../../../components/selector/components/render-item/render-item';
import { Selector } from '../../../../../../components/selector/selector';
import { Text } from '../../../../../../components/text/text';
import { Token } from '../../../../../../components/token/token';
import { ScreensEnum, ScreensParamList } from '../../../../../../enums/sreens.enum';
import { useFilterAccountTokens } from '../../../../../../hooks/use-filter-tokens.hook';
import { useNavigation } from '../../../../../../hooks/use-navigation.hook';
import { Token as TokenType } from '../../../../../../interfaces/token.interface';
import { ModalContainer } from '../../../../../../modals/components/modal-container/modal-container';
import { useTokensMarketInfoSelector } from '../../../../../../store/tokens-market-info/token-market-info.selectors';
import {
  useGasTokenSelector,
  useSelectedNetworkSelector,
  useVisibleAccountTokensSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../../../../../utils/check-is-gas-token.util';
import { getDollarValue } from '../../../../../../utils/get-dollar-amount.util';
import { getTokenMetadataSlug } from '../../../../../../utils/token-metadata.util';
import { getTokenSlug } from '../../../../../../utils/token.utils';
import { getFormattedBalance } from '../../../../../../utils/units.utils';

import { styles } from './tokens-selector.styles';

const keyExtractor = ({ tokenAddress, tokenId }: TokenType) => getTokenSlug(tokenAddress, tokenId);

export const TokensSelector: FC = () => {
  const allTokensMarketInfoSelector = useTokensMarketInfoSelector();
  const {
    params: { token }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendTokensSelector>>();
  const { navigate } = useNavigation();
  const { chainId } = useSelectedNetworkSelector();
  const visibleAccountTokens = useVisibleAccountTokensSelector();
  const accountTokensWithBalance = useMemo(
    () => visibleAccountTokens.filter(visibleAccountToken => Number(visibleAccountToken.balance.data) > 0),
    [visibleAccountTokens]
  );

  const gasToken = useGasTokenSelector();
  const accountTokensWithBalanceAndGasToken: TokenType[] = useMemo(
    () => [gasToken, ...accountTokensWithBalance],
    [accountTokensWithBalance, gasToken]
  );

  const { accountTokens, setSearchValue } = useFilterAccountTokens(accountTokensWithBalanceAndGasToken);

  const selectedIndex = useMemo(
    () =>
      accountTokens.findIndex(
        accountToken => accountToken.tokenAddress === token?.tokenAddress && accountToken.tokenId === token?.tokenId
      ),
    [accountTokens]
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

    const onSelectItem = () => navigate(ScreensEnum.SendToken, { token: item });

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
