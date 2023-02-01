import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Dropdown } from '../../../../components/dropdown/dropdown';
import { Option } from '../../../../components/dropdown/option.interface';
import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../../../modals/components/modal-container/modal-container';
import { setAppLockTimePeriod } from '../../../../store/settings/settings.actions';
import { useLockTimePeriodSelector } from '../../../../store/settings/settings.selectors';

import { lockTimes } from './constants';

export const LockTimeSelector: FC = () => {
  const { goBack } = useNavigation();
  const dispatch = useDispatch();
  const lockTimePeriod = useLockTimePeriodSelector();

  const onSelect = ({ value }: Option<number>) => {
    dispatch(setAppLockTimePeriod(value));
    goBack();
  };

  const selectedId = lockTimes.find(item => item.value === lockTimePeriod)?.id ?? lockTimes[0].id;

  return (
    <ModalContainer screenTitle="Lock time">
      <Dropdown
        options={lockTimes}
        selectedId={selectedId}
        onSelect={onSelect}
        description="Choose the length of the auto lock wallet"
      />
    </ModalContainer>
  );
};
