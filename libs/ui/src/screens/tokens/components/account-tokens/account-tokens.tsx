import { isDefined, OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { Icon } from '../../../../components/icon/icon';
import { IconNameEnum } from '../../../../components/icon/icon-name.enum';
import { Pressable } from '../../../../components/pressable/pressable';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { AccountToken } from '../../../../components/token/account-token/account-token';
import { TokenItemThemesEnum } from '../../../../components/token/token-item/enums';
import { useSortAccountTokensByBalance } from '../../../../hooks/use-sort-tokens-by-balance.hook';
import { Token as TokenInterface } from '../../../../interfaces/token.interface';
import { addNewTokenAction } from '../../../../store/wallet/wallet.actions';
import {
  useAccountTokensSelector,
  useAccountTokensAndGasTokenSelector,
  useVisibleAccountTokensAndGasTokenSelector
} from '../../../../store/wallet/wallet.selectors';
import { getTokensWithBalance } from '../../../../utils/get-tokens-with-balance.util';
import { getTokenSlug } from '../../../../utils/token.utils';
import { filterAccountTokensByValue } from '../../utils/filter-account-tokens-by-value.util';

import { styles } from './account-tokens.styles';

const keyExtractor = ({ tokenAddress, tokenId }: TokenInterface) => getTokenSlug(tokenAddress, tokenId);

interface Props {
  searchValue: string;
  newToken: TokenInterface | null;
  setIsEmptyTokensList: OnEventFn<boolean>;
}

export const AccountTokens: FC<Props> = ({ searchValue, newToken, setIsEmptyTokensList }) => {
  const dispatch = useDispatch();

  const allAccountTokens = useAccountTokensSelector();
  const allAccountTokensWithGasToken = useAccountTokensAndGasTokenSelector();
  const visibleAccountTokensWithGasToken = useVisibleAccountTokensAndGasTokenSelector();

  const [isHideZeroBalance, setIsHideZeroBalance] = useState(false);

  const allAccountTokensWithBalance = useMemo(
    () => getTokensWithBalance(visibleAccountTokensWithGasToken),
    [visibleAccountTokensWithGasToken]
  );

  const filteredAccountTokens = useMemo(() => {
    if (isDefined(newToken) && isAddress(searchValue)) {
      return [newToken];
    }

    if (searchValue && visibleAccountTokensWithGasToken.length) {
      return filterAccountTokensByValue(
        isHideZeroBalance ? allAccountTokensWithBalance : allAccountTokensWithGasToken,
        searchValue
      );
    }

    return isHideZeroBalance ? allAccountTokensWithBalance : visibleAccountTokensWithGasToken;
  }, [
    newToken,
    searchValue,
    allAccountTokens,
    visibleAccountTokensWithGasToken,
    isHideZeroBalance,
    allAccountTokensWithBalance
  ]);

  const sortedTokens = useSortAccountTokensByBalance(filteredAccountTokens);

  useEffect(() => void setIsEmptyTokensList(sortedTokens.length === 0), [sortedTokens]);

  const onPressHideZeroBalances = () => setIsHideZeroBalance(!isHideZeroBalance);

  const handleTokenPress = (token: TokenInterface, isNewToken: boolean) => {
    if (isNewToken) {
      dispatch(
        addNewTokenAction({
          name: token.name,
          symbol: token.symbol,
          tokenAddress: token.tokenAddress,
          decimals: token.decimals,
          thumbnailUri: token.thumbnailUri
        })
      );
    }
  };

  const renderItem = useCallback(
    ({ item: token }: ListRenderItemInfo<TokenInterface>) => {
      const isNewToken = token.tokenAddress === newToken?.tokenAddress;
      const showButton = isNewToken ? false : !token.isVisible;

      return (
        <AccountToken
          token={token}
          showButton={showButton}
          theme={TokenItemThemesEnum.Secondary}
          onPress={() => handleTokenPress(token, isNewToken)}
        />
      );
    },
    [searchValue, newToken]
  );

  return (
    <>
      {!isDefined(newToken) && (
        <Pressable onPress={onPressHideZeroBalances} style={styles.checkboxContainer}>
          <Row>
            <Icon name={isHideZeroBalance ? IconNameEnum.SelectedSquareCheckbox : IconNameEnum.EmptySquareCheckbox} />
            <Text style={styles.checkboxText}>Hide 0 balances</Text>
          </Row>
        </Pressable>
      )}
      <FlatList
        data={sortedTokens}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </>
  );
};
