import { nanoid } from '@reduxjs/toolkit';
import React, { useCallback, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { changeNetworkAction, getGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import { useGetAllNetworks, useGetSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { NetworkInrerface } from '../../types/networks.type';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const dispatch = useDispatch();

  const selectedNetwork = useGetSelectedNetworkSelector();
  const networks = useGetAllNetworks();

  const handleNetworkSelect = useCallback(
    (networkParam: NetworkInrerface) => {
      dispatch(changeNetworkAction(networkParam.rpcUrl));
    },
    [selectedNetwork]
  );

  useEffect(() => {
    dispatch(getGasTokenBalanceAction.submit());
  }, [selectedNetwork]);

  return (
    <View>
      <Text style={NetworksStyles.balanceWrapper}>
        Current network: <Text style={NetworksStyles.balance}>{selectedNetwork.name}</Text>
      </Text>

      <View>
        {networks.map(network => (
          <TouchableOpacity key={nanoid()} onPress={() => handleNetworkSelect(network)} style={NetworksStyles.network}>
            <Text>{network.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
