import React, { useEffect } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { useDispatch } from 'react-redux';

import { ListOfChains } from '../../constants/list-of-chains';
import { changeNetworkAction } from '../../store/settings/settings.actions';
import { getGasTokenBalanceAction } from '../../store/wallet/wallet.actions';
import { Dropdown } from '../dropdown';

type ChainsDropdownProps = {
  style?: StyleProp<TextStyle>;
};

export const ChainsDropdown: React.FC<ChainsDropdownProps> = () => {
  const dispatch = useDispatch();

  const handleChainSelect = (network: string) => {
    dispatch(changeNetworkAction(network));
  };

  useEffect(() => {
    dispatch(getGasTokenBalanceAction.submit());
  }, []);

  return <Dropdown placeholder={ListOfChains[0]} onValueChange={handleChainSelect} items={ListOfChains} />;
};
