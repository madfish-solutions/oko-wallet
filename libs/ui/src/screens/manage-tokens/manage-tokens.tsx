import React, { FC, Fragment } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { Token } from '../../interfaces/token.interface';
import { changeTokenVisibilityAction } from '../../store/wallet/wallet.actions';
import { useAccountTokensSelector } from '../../store/wallet/wallet.selectors';

export const ManageTokens: FC = () => {
  const dispatch = useDispatch();
  const accountTokens = useAccountTokensSelector();

  const handleTokenVisibility = (tokenAddress: Token['tokenAddress']) =>
    dispatch(changeTokenVisibilityAction(tokenAddress));

  return (
    <View>
      <NavigationBar />
      {accountTokens.map(({ tokenAddress, name, thumbnailUri, isVisible }) => (
        <Fragment key={tokenAddress}>
          <Text>Token Address: {tokenAddress}</Text>
          <Text>Name: {name}</Text>
          <Text>Thumbnail Uri: {thumbnailUri}</Text>
          <Text>isVisible: {isVisible.toString()}</Text>
          <Pressable onPress={() => handleTokenVisibility(tokenAddress)}>
            <Text>{isVisible ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </Fragment>
      ))}
    </View>
  );
};
