import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadGasTokenBalanceAction } from '../../../../../../store/wallet/wallet.actions';
import {
  useSelectedAccountPkhSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../../../../utils/units.utils';
import { getImageSource } from '../../utils/get-image-source.util';
import { Token } from '../token/token';

export const GasToken: FC = () => {
  const {
    gasTokenMetadata: { decimals, symbol, thumbnailUri },
    gasTokenBalance: { data: balance }
  } = useSelectedNetworkSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const pkh = useSelectedAccountPkhSelector();
  const dispatch = useDispatch();

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = formatUnits(balance, decimals);

  useEffect(() => {
    dispatch(loadGasTokenBalanceAction.submit());
  }, [selectedNetwork.rpcUrl, pkh]);

  return <Token imageSource={imageSource} balance={formattedBalance} isGasToken symbol={symbol} />;
};
