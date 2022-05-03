import React, { useCallback } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { ChainType, ListOfChains } from '../../constants/list-of-chains';
import { Dropdown } from '../dropdown';

type ChainsDropdownProps = {
  style?: StyleProp<TextStyle>;
};

export const ChainsDropdown: React.FC<ChainsDropdownProps> = () => {
  const handleChainSelect = useCallback((value: ChainType) => {
    console.log(`Selected network: ${value}`);
  }, []);

  return <Dropdown onValueChange={handleChainSelect} items={ListOfChains} />;
};
