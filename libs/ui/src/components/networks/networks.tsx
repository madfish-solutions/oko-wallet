import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NetworkInterface } from '../../interfaces/network.interface';
import { changeSelectedNetworkAction, loadGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const dispatch = useDispatch();

  const selectedNetwork = useSelectedNetworkSelector();
  const networks = useAllNetworksSelector();

  const handleNetworkSelect = (newSelectedNetwork: NetworkInterface) => {
    dispatch(changeSelectedNetworkAction(newSelectedNetwork.rpcUrl));
  };

  useEffect(() => {
    dispatch(loadGasTokenBalanceAction.submit());
  }, [selectedNetwork.rpcUrl]);

  return (
    <View>
      <Text style={NetworksStyles.balanceWrapper}>
        Current network: <Text style={NetworksStyles.balance}>{selectedNetwork.name}</Text>
      </Text>

      <View>
        {networks.map(network => (
          <TouchableOpacity
            key={network.rpcUrl}
            onPress={() => handleNetworkSelect(network)}
            style={NetworksStyles.network}
          >
            <Text>{network.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
