import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useDispatch } from 'react-redux';

import { ListOfChains } from '../../constants/list-of-chains';
import { getGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import { Dropdown } from '../dropdown';

type ChainsDropdownProps = {
  style?: StyleProp<TextStyle>;
};

export const ChainsDropdown: React.FC<ChainsDropdownProps> = () => {
  const dispatch = useDispatch();

  const handleChainSelect = (network: string) => {
    dispatch(getGasTokenBalanceAction.submit(network));
  };

  return <Dropdown onValueChange={handleChainSelect} items={ListOfChains} />;
};
