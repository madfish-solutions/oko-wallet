import React, { useEffect, useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useDispatch } from 'react-redux';

import { changeNetworkAction } from '../../store/settings/settings.actions';
import { useGetAllNetworksNameSelector, useGetNetworkSelector } from '../../store/settings/settings.selectors';
import { Dropdown } from '../dropdown';

import { NetworksDropdownStyles } from './network-dropdown.styles';

type NetworksDropdownProps = {
  style?: StyleProp<TextStyle>;
};

export const NetworksDropdown: React.FC<NetworksDropdownProps> = ({ style }) => {
  const dispatch = useDispatch();

  const network = useGetNetworkSelector();
  const networksName = useGetAllNetworksNameSelector();

  const [isOpen, setIsOpen] = useState(false);
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
    <Dropdown
      isOpen={isOpen}
      setVisibleState={() => setIsOpen(!isOpen)}
      onPress={handleNetworkSelect}
      data={networksName}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      style={[NetworksDropdownStyles.dropdown, style]}
    />
  );
};
