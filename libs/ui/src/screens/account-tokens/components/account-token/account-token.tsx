import React, { FC, useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { MainText } from '../../../../components/text/text';
import { Token } from '../../../../interfaces/token.interface';
import { loadAccountTokenBalanceAction } from '../../../../store/wallet/wallet.actions';
import { formatUnits } from '../../../../utils/units.utils';

import { styles } from './account-token.styles';

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
    <View style={styles.root}>
      <MainText>Address: {tokenAddress}</MainText>
      <MainText>Name: {name}</MainText>
      <MainText>Decimals: {decimals}</MainText>
      <MainText>Thumbnail: {thumbnailUri}</MainText>
      <MainText>Balance: {balanceWithLoading}</MainText>
    </View>
  );
};
