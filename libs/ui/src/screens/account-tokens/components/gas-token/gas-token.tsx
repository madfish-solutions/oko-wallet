import React, { FC, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { MainText } from '../../../../components/text/text';
import { loadGasTokenBalanceAction } from '../../../../store/wallet/wallet.actions';
import { useSelectedAccountPkhSelector, useSelectedNetworkSelector } from '../../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../../utils/units.utils';

import { styles } from './gas-token.styles';

export const GasToken: FC = () => {
  const {
    gasTokenMetadata: { decimals, symbol },
    gasTokenBalance: { isLoading, data: balance }
  } = useSelectedNetworkSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const pkh = useSelectedAccountPkhSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGasTokenBalanceAction.submit());
  }, [selectedNetwork.rpcUrl, pkh]);

  const gasTokenBalanceWithLoading = useMemo(
    () => (isLoading ? '...' : `${formatUnits(balance, decimals)} ${symbol}`),
    [isLoading]
  );

  return (
    <View style={styles.root}>
      <MainText>
        Gas Token Balance: <MainText>{gasTokenBalanceWithLoading}</MainText>
      </MainText>
    </View>
  );
};
