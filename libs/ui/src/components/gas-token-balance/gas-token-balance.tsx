import React, { FC, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { loadGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import { useSelectedAccountPkhSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { formatUnits } from '../../utils/units.utils';
import { Networks } from '../networks/networks';

import { GasTokenBalanceStyles } from './gas-token-balance.styles';

export const GasTokenBalance: FC = () => {
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
    <View style={GasTokenBalanceStyles.root}>
      <View style={GasTokenBalanceStyles.container}>
        <Text style={GasTokenBalanceStyles.balanceWrapper}>
          Current network: <Text style={GasTokenBalanceStyles.balance}>{selectedNetwork.name}</Text>
        </Text>
        <Text style={GasTokenBalanceStyles.balanceWrapper}>
          Balance: <Text style={GasTokenBalanceStyles.balance}>{gasTokenBalanceWithLoading}</Text>
        </Text>
      </View>
      <Networks />
    </View>
  );
};
