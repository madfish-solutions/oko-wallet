import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Token as TokenInterface } from '../../../../../../interfaces/token.interface';
import { loadAccountTokenBalanceAction } from '../../../../../../store/wallet/wallet.actions';
import { formatUnits } from '../../../../../../utils/units.utils';
import { getImageSource } from '../../utils/get-image-source.util';
import { Token } from '../token/token';

interface Props {
  token: TokenInterface;
}

export const AccountToken: FC<Props> = ({ token }) => {
  const dispatch = useDispatch();
  const { decimals, thumbnailUri, balance, symbol } = token;

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = formatUnits(balance.data, decimals);

  useEffect(() => {
    dispatch(loadAccountTokenBalanceAction.submit({ token }));
  }, []);

  return <Token imageSource={imageSource} balance={formattedBalance} symbol={symbol} />;
};
