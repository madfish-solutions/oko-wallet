import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NetworkInterface } from '../../interfaces/network.interface';
import { changeSelectedNetworkAction, generateHDAccountAction } from '../../store/wallet/wallet.actions';
import { useAccountIsExist, useAllNetworksSelector } from '../../store/wallet/wallet.selectors';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const isUserHasAccountBySelectedBlockchain = useAccountIsExist();
  const dispatch = useDispatch();

  const networks = useAllNetworksSelector();

  const handleNetworkSelect = (newSelectedNetwork: NetworkInterface) => {
    dispatch(
      changeSelectedNetworkAction({ rpcUrl: newSelectedNetwork.rpcUrl, blockchain: newSelectedNetwork.blockchain })
    );
  };

  useEffect(() => {
    if (!isUserHasAccountBySelectedBlockchain) {
      dispatch(generateHDAccountAction.submit());
    }
  }, [isUserHasAccountBySelectedBlockchain]);

  return (
    <View>
      <Text style={NetworksStyles.allNetworksText}>All networks:</Text>
      <View>
        {networks.map((network, index) => (
          <TouchableOpacity
            key={network.rpcUrl}
            onPress={() => handleNetworkSelect(network)}
            style={NetworksStyles.network}
          >
            <Text>{`${index + 1}. ${network.name}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
