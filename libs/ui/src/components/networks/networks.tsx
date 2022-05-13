import { nanoid } from '@reduxjs/toolkit';
import React, { useCallback, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { changeNetworkAction } from '../../store/settings/settings.actions';
import { useGetAllNetworksNameSelector, useGetNetworkSelector } from '../../store/settings/settings.selectors';
import { getGasTokenBalanceAction } from '../../store/wallet/wallet.actions';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const dispatch = useDispatch();

  const network = useGetNetworkSelector();
  const networksName = useGetAllNetworksNameSelector();

  const handleNetworkSelect = useCallback(
    (network: string) => {
      dispatch(changeNetworkAction(network));
    },
    [network]
  );

  useEffect(() => {
    dispatch(getGasTokenBalanceAction.submit());
  }, []);

  return (
    <View>
      <Text style={NetworksStyles.balanceWrapper}>
        Current network: <Text style={NetworksStyles.balance}>{network}</Text>
      </Text>

      <View>
        {networksName.map(network => (
          <TouchableOpacity key={nanoid()} onPress={() => handleNetworkSelect(network)} style={NetworksStyles.network}>
            <Text>{network}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
