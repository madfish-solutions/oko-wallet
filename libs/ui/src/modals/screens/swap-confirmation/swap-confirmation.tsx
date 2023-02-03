import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';

import { ONE_INCH_SITE, ONE_INCH_ICON } from '../../../api/1inch/constants';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { EvmConfirmation } from '../../../screens/send-confirmation/components/evm-confirmation/evm-confirmation';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

export const SwapConfirmation: FC = () => {
  const {
    params: { transferParams }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SwapConfirmation>>();

  return (
    <EvmConfirmation transferParams={transferParams}>
      <DAppHeader favicon={ONE_INCH_ICON} origin={ONE_INCH_SITE} />
    </EvmConfirmation>
  );
};
