import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { useShelter } from '../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../interfaces/network.interface';
import { changeNetworkAction } from '../../store/wallet/wallet.actions';
import { useAllNetworksSelector, useSelectedAccountSelector } from '../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const dispatch = useDispatch();
  const selectedAccount = useSelectedAccountSelector();
  const networks = useAllNetworksSelector();
  const { createHdAccountForNewNetworkType } = useShelter();

  const handleSelectNetwork = ({ rpcUrl, networkType }: NetworkInterface) => {
    dispatch(changeNetworkAction({ rpcUrl, networkType, accountIndex: selectedAccount.accountIndex }));

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType);
    }
  };

  return (
    <View>
      <Text style={NetworksStyles.allNetworksText}>All networks:</Text>
      <View>
        {networks.map((network, index) => (
          <TouchableOpacity
            key={network.rpcUrl}
            onPress={() => handleSelectNetwork(network)}
            style={NetworksStyles.network}
          >
            <Text>{`${index + 1}. ${network.name}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
