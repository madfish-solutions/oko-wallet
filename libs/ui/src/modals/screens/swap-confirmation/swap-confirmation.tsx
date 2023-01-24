import { TransactionResponse } from '@ethersproject/abstract-provider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';

import { ONE_INCH_SITE, ONE_INCH_ICON } from '../../../api/1inch/constants';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { EvmConfirmation } from '../../../screens/send-confirmation/components/evm-confirmation/evm-confirmation';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../store/wallet/wallet.selectors';
import { DAppHeader } from '../d-app-connection-confirmation/d-app-header/d-app-header';

export const SwapConfirmation: FC = () => {
  const {
    params: { transferParams }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SwapConfirmation>>();
  const { signEvmData } = useShelter();
  const { rpcUrl } = useSelectedNetworkSelector();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  const onConfirm = (successCallback: OnEventFn<TransactionResponse>, gasPrice: number) => {
    if (isDefined(transferParams.dataToSign)) {
      signEvmData({
        publicKeyHash,
        data: { ...transferParams.dataToSign, gasPrice },
        rpcUrl,
        successCallback
      });
    }
  };

  return (
    <EvmConfirmation transferParams={transferParams} onConfirm={onConfirm}>
      <DAppHeader favicon={ONE_INCH_ICON} origin={ONE_INCH_SITE} />
    </EvmConfirmation>
  );
};
