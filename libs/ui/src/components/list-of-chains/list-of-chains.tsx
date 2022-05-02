import React, { useCallback } from 'react';
import { StyleProp, TextStyle } from 'react-native';

import { ChainType, LIST_OF_CHAINS } from '../../constants/list-of-chains';
import { Dropdown } from '../dropdown';

type ListOfChainsProps = {
  style?: StyleProp<TextStyle>;
};

export const ListOfChains: React.FC<ListOfChainsProps> = () => {
  const handleChainSelect = useCallback((value: ChainType) => {
    console.log(value);
  }, []);

  return <Dropdown onValueChange={handleChainSelect} items={LIST_OF_CHAINS} />;
};
