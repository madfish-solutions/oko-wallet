import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useDispatch } from 'react-redux';

import { ListOfChains } from '../../constants/list-of-chains';
import { changeNetworkAction } from '../../store/settings/settings.actions';
import { Dropdown } from '../dropdown';

type ChainsDropdownProps = {
  style?: StyleProp<TextStyle>;
};

export const ChainsDropdown: React.FC<ChainsDropdownProps> = () => {
  const dispatch = useDispatch();

  const handleChainSelect = (network: string) => {
    dispatch(changeNetworkAction(network));
  };

  return <Dropdown onValueChange={handleChainSelect} items={ListOfChains} />;
};
