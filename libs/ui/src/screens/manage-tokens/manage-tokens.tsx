import React, { FC, Fragment } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { ScreenContainer } from '../../components/screen-container/screen-container/screen-container';
import { MainText } from '../../components/text/text';
import { Token } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAccountTokensSelector } from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const accountTokens = useAccountTokensSelector();

  const handleTokenVisibility = (token: Token) => dispatch(changeTokenVisibilityAction(token));

  return (
    <ScreenContainer screenTitle="Manage tokens">
      {accountTokens.map(token => (
        <Fragment key={getTokenSlug(token)}>
          <MainText>Token Address: {token.tokenAddress}</MainText>
          <MainText>Name: {token.name}</MainText>
          <MainText>Thumbnail Uri: {token.thumbnailUri}</MainText>
          <MainText>Token ID: {token.tokenId}</MainText>
          <MainText>Token Type (for Tezos): {token.tezosTokenType}</MainText>
          <MainText>isVisible: {token.isVisible.toString()}</MainText>
          <Pressable onPress={() => handleTokenVisibility(token)}>
            <MainText>{token.isVisible ? 'Hide' : 'Show'}</MainText>
          </Pressable>
        </Fragment>
      ))}
    </ScreenContainer>
  );
};
