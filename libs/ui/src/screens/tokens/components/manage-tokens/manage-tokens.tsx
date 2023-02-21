import { isDefined, OnEventFn } from '@rnw-community/shared';
import { isAddress } from 'ethers/lib/utils';
import React, { FC, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Row } from '../../../../components/row/row';
import { ScreenScrollView } from '../../../../components/screen-components/screen-scroll-view/screen-scroll-view';
import { Switch } from '../../../../components/switch/switch';
import { Token } from '../../../../components/token/token';
import { Token as TokenInterface } from '../../../../interfaces/token.interface';
import {
  addNewTokenAction,
  changeTokenVisibilityAction,
  sortAccountTokensByVisibility
} from '../../../../store/wallet/wallet.actions';
import { useAccountTokensAndGasTokenSelector } from '../../../../store/wallet/wallet.selectors';
import { checkIsGasToken } from '../../../../utils/check-is-gas-token.util';
import { getTokenSlug } from '../../../../utils/token.utils';
import { filterAccountTokensByValue } from '../../utils/filter-account-tokens-by-value.util';

import { styles } from './manage-tokens.styles';

interface Props {
  searchValue: string;
  newToken: TokenInterface | null;
  setIsEmptyTokensList: OnEventFn<boolean>;
}

export const ManageTokens: FC<Props> = ({ searchValue, newToken, setIsEmptyTokensList }) => {
  const dispatch = useDispatch();

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

  const handleTokenVisibility = (token: TokenInterface, isNewToken: boolean) => {
    dispatch(changeTokenVisibilityAction(token));

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

  useEffect(() => {
    if (searchValue.length === 0) {
      dispatch(sortAccountTokensByVisibility());
    }
  }, [searchValue.length]);

  return (
    <ScreenScrollView style={styles.root}>
      {accountTokens.map(token => {
        const isGasToken = checkIsGasToken(token.tokenAddress);
        const isNewToken = token.tokenAddress === newToken?.tokenAddress;

        return (
          <Row key={getTokenSlug(token.tokenAddress, token.tokenId)} style={styles.token}>
            <Token uri={token.thumbnailUri} symbol={token.symbol} name={token.name} gasToken={isGasToken} />
            <Switch
              onPress={() => handleTokenVisibility(token, isNewToken)}
              isActive={token.isVisible}
              disabled={isGasToken}
            />
          </Row>
        );
      })}
    </ScreenScrollView>
  );
};
