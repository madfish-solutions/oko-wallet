import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { NetworkTypeEnum } from 'shared';

import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';

import { EvmConfirmation } from './components/evm-confirmation/evm-confirmation';
import { TezosConfirmation } from './components/tezos-confirmation/tezos-confirmation';
import { EvmTransferParams, TezosTransferParams } from './types';

export const SendConfirmation: FC = () => {
  const {
    params: { transferParams }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendConfirmation>>();
  const networkType = useSelectedNetworkTypeSelector();

  return networkType === NetworkTypeEnum.Tezos ? (
    <TezosConfirmation transferParams={transferParams as TezosTransferParams} />
  ) : (
    <EvmConfirmation transferParams={transferParams as EvmTransferParams} />
  );
};
