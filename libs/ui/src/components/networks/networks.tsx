import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import { changeNetworkAction } from '../../store/settings/settings.actions';
import { useGetAllNetworksNameSelector, useGetNetworkSelector } from '../../store/settings/settings.selectors';

import { NetworksStyles } from './networks.styles';

export const Networks: React.FC = () => {
  const dispatch = useDispatch();

  const network = useGetNetworkSelector();
  const networksName = useGetAllNetworksNameSelector();

  const [selectedItem, setSelectedItem] = useState<string>(network);

  useEffect(() => {
    setSelectedItem(network);
  }, [network]);

  const handleNetworkSelect = (network: string) => {
    dispatch(changeNetworkAction(network));
  };

  useEffect(() => {
    dispatch(changeNetworkAction(network));
  }, [network]);

  return (
    <View>
      <Text style={NetworksStyles.balanceWrapper}>
        Current network: <Text style={NetworksStyles.balance}>{selectedItem}</Text>
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
