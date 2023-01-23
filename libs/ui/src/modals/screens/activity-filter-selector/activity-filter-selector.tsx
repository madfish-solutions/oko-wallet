import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { Dropdown } from '../../../components/dropdown/dropdown';
import { Option } from '../../../components/dropdown/option.interface';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { ActivityFilterEnum } from './activity-filter.enum';
import { ACTIVITIES_TYPES } from './constants';

export const ActivityFilterSelector: FC = () => {
  const {
    params: { filterType }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.ActivityFilterSelector>>();

  const { navigate } = useNavigation();

  const handleFilterSelect = (param: Option<ActivityFilterEnum>) => {
    navigate(ScreensEnum.Activity, { filterType: param });
  };

  return (
    <ModalContainer screenTitle="Activity Filter">
      <Dropdown
        options={ACTIVITIES_TYPES}
        onSelect={handleFilterSelect}
        selectedId={filterType.id}
        description="Choose filter"
      />
    </ModalContainer>
  );
};
