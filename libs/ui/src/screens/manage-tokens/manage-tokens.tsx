import React, { FC, Fragment } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { AccountTokenInterface } from '../../store/wallet/types';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAllAccountTokensSelector } from '../../store/wallet/wallet.selectors';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const allAccountTokens = useAllAccountTokensSelector();

  const handleTokenVisibility = (tokenAddress: AccountTokenInterface['tokenAddress']) =>
    dispatch(changeTokenVisibilityAction(tokenAddress));

  return (
    <View>
      {allAccountTokens.map(({ tokenAddress, name, imageUrl, isVisible }) => (
        <Fragment key={tokenAddress}>
          <Text>Name: {name}</Text>
          <Text>Image URL: {imageUrl}</Text>
          <Text>isVisible: {isVisible.toString()}</Text>
          <Pressable onPress={() => handleTokenVisibility(tokenAddress)}>
            <Text>{isVisible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </Fragment>
      ))}
    </View>
  );
};
