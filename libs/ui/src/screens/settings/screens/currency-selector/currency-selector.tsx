import React, { FC } from 'react';

import { Dropdown } from '../../../../components/dropdown/dropdown';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../../../modals/components/modal-container/modal-container';

import { currencies } from './constants';

export const CurrencySelector: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ModalContainer screenTitle="Currency">
      <Dropdown options={currencies} onSelect={goBack} description="Choose Currency" />
    </ModalContainer>
  );
};
