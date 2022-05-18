import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { NetworkInterface } from '../../interfaces/network.interface';
import { generateHdAccountByNetworkTypeAction, changeNetworkAction } from '../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();

  const handleNetworkSelect = ({ rpcUrl, networkType }: NetworkInterface) => {
    dispatch(changeNetworkAction({ rpcUrl, networkType, accontIndex: selectedAccount.accountIndex }));

    const isExist = selectedAccount.networks.hasOwnProperty(networkType);
    if (!isExist) {
      dispatch(generateHdAccountByNetworkTypeAction.submit(selectedAccount));
    }
  };

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
