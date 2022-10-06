import React, { FC } from 'react';

import { Dropdown } from '../../../../components/dropdown/dropdown';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../../../modals/components/modal-container/modal-container';

import { themes } from './constants';

export const AppearanceSelector: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ModalContainer screenTitle="Appearance">
      <Dropdown options={themes} onSelect={goBack} description="Choose Appearance" />
    </ModalContainer>
  );
};
