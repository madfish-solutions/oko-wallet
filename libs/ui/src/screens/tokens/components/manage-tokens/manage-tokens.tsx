import { isDefined, OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useDispatch } from 'react-redux';

import { Row } from '../../../../components/row/row';
import { Switch } from '../../../../components/switch/switch';
import { Token } from '../../../../components/token/token';
import { Token as TokenInterface } from '../../../../interfaces/token.interface';
import { changeTokenVisibilityAction, sortAccountTokensByVisibility } from '../../../../store/wallet/wallet.actions';
import { useAccountTokensAndGasTokenSelector } from '../../../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../../../utils/check-is-gas-token.util';
import { getTokenSlug } from '../../../../utils/token.utils';
import { useAddNewTokenToAccount } from '../../hooks/use-add-new-token-to-account.hook';
import { filterAccountTokensByValue } from '../../utils/filter-account-tokens-by-value.util';

import { styles } from './manage-tokens.styles';

interface Props {
  searchValue: string;
  newToken: TokenInterface | null;
  setIsEmptyTokensList: OnEventFn<boolean>;
  keyExtractor: (token: TokenInterface) => string;
}

export const ManageTokens: FC<Props> = ({ searchValue, newToken, setIsEmptyTokensList, keyExtractor }) => {
  const dispatch = useDispatch();
  const { addNewTokenToAccount } = useAddNewTokenToAccount();

  const accountTokensAndGasToken = useAccountTokensAndGasTokenSelector();

  const accountTokens = useMemo(() => {
    if (isDefined(newToken) && isAddress(searchValue)) {
      return [newToken];
    }

    if (searchValue && accountTokensAndGasToken.length) {
      return filterAccountTokensByValue(accountTokensAndGasToken, searchValue);
    }

    return accountTokensAndGasToken;
  }, [searchValue, accountTokensAndGasToken, newToken]);

  useEffect(() => void setIsEmptyTokensList(accountTokens.length === 0), [accountTokens]);

  useEffect(() => {
    if (searchValue.length === 0) {
      dispatch(sortAccountTokensByVisibility());
    }
  }, [searchValue.length]);

  const handlePressToken = (token: TokenInterface, isNewToken: boolean) => {
    if (!isNewToken) {
      dispatch(changeTokenVisibilityAction(token));
    }

    addNewTokenToAccount(token, isNewToken);
  };

  const renderItem = useCallback(
    ({ item: token }: ListRenderItemInfo<TokenInterface>) => {
      const isGasToken = checkIsGasToken(token.tokenAddress);
      const isNewToken = token.tokenAddress === newToken?.tokenAddress;

      return (
        <Row key={getTokenSlug(token.tokenAddress, token.tokenId)} style={styles.token}>
          <Token uri={token.thumbnailUri} symbol={token.symbol} name={token.name} gasToken={isGasToken} />
          <Switch
            onPress={() => handlePressToken(token, isNewToken)}
            isActive={token.isVisible}
            disabled={isGasToken}
          />
        </Row>
      );
    },
    [searchValue, newToken]
  );

  return (
    <FlatList
      data={accountTokens}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};
