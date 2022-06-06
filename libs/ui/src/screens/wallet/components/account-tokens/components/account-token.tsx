import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Token } from '../../../../../interfaces/token.interface';
import { loadAccountTokenBalanceAction } from '../../../../../store/wallet/wallet.actions';
import { formatUnits } from '../../../../../utils/units.utils';
import { WalletStyles } from '../../../wallet.styles';

interface Props {
  token: Token;
}

export const AccountToken: FC<Props> = ({ token }) => {
  const dispatch = useDispatch();
  const { tokenAddress, name, decimals, thumbnailUri, balance } = token;

  useEffect(() => {
    dispatch(loadAccountTokenBalanceAction.submit({ token }));
  }, []);

  const balanceWithLoading = balance.isLoading ? '...' : formatUnits(balance.data, decimals);

  return (
    <View style={WalletStyles.wrapper}>
      <Text>Address: {tokenAddress}</Text>
      <Text>Name: {name}</Text>
      <Text>Decimals: {decimals}</Text>
      <Text>Thumbnail: {thumbnailUri}</Text>
      <Text>
        {'Balance: '}
        <Text style={WalletStyles.boldText}>{balanceWithLoading}</Text>
      </Text>
    </View>
  );
};
