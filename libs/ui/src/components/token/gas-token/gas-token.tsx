import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getImageSource } from '../../../screens/wallet/components/assets-widget/utils/get-image-source.util';
import { loadGasTokenBalanceAction } from '../../../store/wallet/wallet.actions';
import { useSelectedAccountPkhSelector, useSelectedNetworkSelector } from '../../../store/wallet/wallet.selectors';
import { formatBalances, formatUnits } from '../../../utils/units.utils';
import { TokenItemThemesEnum } from '../token-item/enums';
import { TokenItem } from '../token-item/token-item';

interface Props {
  searchValue?: string;
  theme?: TokenItemThemesEnum;
  loadBalance?: boolean;
}

export const GasToken: FC<Props> = ({ theme, loadBalance = true }) => {
  const {
    gasTokenMetadata: { decimals, symbol, thumbnailUri, name },
    gasTokenBalance: { data: balance },
    rpcUrl
  } = useSelectedNetworkSelector();
  const pkh = useSelectedAccountPkhSelector();
  const dispatch = useDispatch();

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = formatBalances(Number(formatUnits(balance, decimals)));

  useEffect(() => {
    if (loadBalance) {
      dispatch(loadGasTokenBalanceAction.submit());
    }
  }, [rpcUrl, pkh]);

  return (
    <TokenItem
      imageSource={imageSource}
      balance={formattedBalance}
      isGasToken
      symbol={symbol}
      theme={theme}
      name={name}
    />
  );
};
