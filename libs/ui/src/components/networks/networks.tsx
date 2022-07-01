import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { useShelter } from '../../hooks/use-shelter.hook';
import { NetworkInterface } from '../../interfaces/network.interface';
import { changeNetworkAction } from '../../store/wallet/wallet.actions';
import {
  useAllNetworksSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../store/wallet/wallet.selectors';
import { checkIsNetworkTypeKeyExist } from '../../utils/check-is-network-type-key-exist';

import { NetworksStyles } from './networks.styles';

export const Networks: FC = () => {
  const dispatch = useDispatch();
  const selectedAccount = useSelectedAccountSelector();
  const selectedNetwork = useSelectedNetworkSelector();
  const networks = useAllNetworksSelector();
  const { createHdAccountForNewNetworkType } = useShelter();

  const handleSelectNetwork = ({ rpcUrl, networkType }: NetworkInterface) => {
    dispatch(changeNetworkAction(rpcUrl));

    if (!checkIsNetworkTypeKeyExist(selectedAccount, networkType)) {
      createHdAccountForNewNetworkType(selectedAccount, networkType);
    }
  };

  return (
    <View>
      <Text>
        Current network: <Text>{selectedNetwork.name}</Text>
      </Text>
      <Text style={NetworksStyles.allNetworksText}>All networks:</Text>
      <View>
        {networks.map(network => (
          <TouchableOpacity key={network.rpcUrl} onPress={() => handleSelectNetwork(network)}>
            <Text style={NetworksStyles.networkName}>{network.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
