import React, { FC, Fragment } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { SecondaryScreenContainer } from '../../components/screen-container/secondary-screen-container/secondary-screen-container';
import { Text } from '../../components/text/text';
import { Token } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAccountTokensSelector } from '../../store/wallet/wallet.selectors';
import { getTokenSlug } from '../../utils/token.utils';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const accountTokens = useAccountTokensSelector();

  const handleTokenVisibility = (token: Token) => dispatch(changeTokenVisibilityAction(token.tokenAddress));

  return (
    <SecondaryScreenContainer screenTitle="Manage tokens">
      {accountTokens.map(token => (
        <Fragment key={getTokenSlug(token)}>
          <Text>Token Address: {token.tokenAddress}</Text>
          <Text>Name: {token.name}</Text>
          <Text>Thumbnail Uri: {token.thumbnailUri}</Text>
          <Text>Token ID: {token.tokenId}</Text>
          <Text>Token Type (for Tezos): {token.tezosTokenType}</Text>
          <Text>isVisible: {token.isVisible.toString()}</Text>
          <Pressable onPress={() => handleTokenVisibility(token)}>
            <Text>{token.isVisible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </Fragment>
      ))}
    </SecondaryScreenContainer>
  );
};
