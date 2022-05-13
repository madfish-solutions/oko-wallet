import React, { FC, Fragment } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { TokenMetadata, AccountTokenInfo } from '../../store/wallet/types';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAllAccountTokens } from '../../store/wallet/wallet.selectors';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const allAccountTokens = useAllAccountTokens();

  const handleTokenVisibility = (
    tokenAddress: TokenMetadata['tokenAddress'],
    isVisible: AccountTokenInfo['isVisible']
  ) => dispatch(changeTokenVisibilityAction({ tokenAddress, isVisible }));

  return (
    <View>
      {allAccountTokens.map(({ tokenAddress, name, url, isVisible }) => (
        <Fragment key={tokenAddress}>
          <Text>Name: {name}</Text>
          <Text>URL: {url}</Text>
          <Text>isVisible: {isVisible.toString()}</Text>
          <Pressable onPress={() => handleTokenVisibility(tokenAddress, !isVisible)}>
            <Text>{isVisible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </Fragment>
      ))}
    </View>
  );
};
