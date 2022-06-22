import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';
import React, { FC } from 'react';
import { View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useSelectedNetworkTypeSelector } from '../../store/wallet/wallet.selectors';

import { EvmConfirmation } from './components/evm-confirmation/evm-confirmation';
import { TezosConfirmation } from './components/tezos-confirmation/tezos-confirmation';

export const SendConfirmation: FC = () => {
  const {
    params: { transferParams }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendConfirmation>>();
  const networkType = useSelectedNetworkTypeSelector();

  const confirmationComponent =
    networkType === NetworkTypeEnum.Tezos ? (
      <TezosConfirmation transferParams={transferParams as TezosTransferParams} />
    ) : (
      <EvmConfirmation transferParams={transferParams as EvmTransferParams} />
    );

  return (
    <View>
      <NavigationBar />
      {confirmationComponent}
    </View>
  );
};
