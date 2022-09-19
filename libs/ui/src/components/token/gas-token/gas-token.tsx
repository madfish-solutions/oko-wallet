import React, { FC, useEffect } from 'react';
import { Pressable } from 'react-native';
import { useDispatch } from 'react-redux';

import { GAS_TOKEN_ADDRESS } from '../../../constants/defaults';
import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
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
    gasTokenBalance,
    rpcUrl
  } = useSelectedNetworkSelector();
  const pkh = useSelectedAccountPkhSelector();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const imageSource = getImageSource(thumbnailUri);
  const formattedBalance = formatBalances(formatUnits(gasTokenBalance.data, decimals));

  useEffect(() => {
    if (loadBalance) {
      dispatch(loadGasTokenBalanceAction.submit());
    }
  }, [rpcUrl, pkh]);

  const navigateToTokenDetails = () =>
    navigate(ScreensEnum.Token, {
      token: {
        tokenAddress: GAS_TOKEN_ADDRESS,
        symbol,
        thumbnailUri,
        name,
        decimals,
        isVisible: true,
        balance: gasTokenBalance
      }
    });

  return (
    <Pressable onPress={navigateToTokenDetails}>
      <TokenItem
        imageSource={imageSource}
        balance={formattedBalance}
        isGasToken
        symbol={symbol}
        theme={theme}
        name={name}
      />
    </Pressable>
  );
};
