import React, { FC, useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { loadGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import {
  useSelectedAccountByBlockchainSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';
import { Networks } from '../networks/networks';

import { GasTokenBalanceStyles } from './gas-token-balance.styles';

export const GasTokenBalance: FC = () => {
  const { gasTokenMetadata, gasTokenBalance } = useSelectedNetworkSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const selectedAccount = useSelectedAccountByBlockchainSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGasTokenBalanceAction.submit());
  }, [selectedNetwork.rpcUrl, selectedAccount.publicKeyHash]);

  const gasTokenBalanceWithLoading = gasTokenBalance.isLoading
    ? '...'
    : `${gasTokenBalance.data} ${gasTokenMetadata.symbol}`;

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
