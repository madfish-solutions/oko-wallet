import React, { FC } from 'react';

import { Dropdown } from '../../../../components/dropdown/dropdown';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../../../modals/components/modal-container/modal-container';

import { lockTimes } from './constants';

export const LockTimeSelector: FC = () => {
  const { goBack } = useNavigation();

  return (
    <ModalContainer screenTitle="Lock time">
      <Dropdown options={lockTimes} onSelect={goBack} description="Choose the length of the auto lock wallet" />
    </ModalContainer>
  );
};
