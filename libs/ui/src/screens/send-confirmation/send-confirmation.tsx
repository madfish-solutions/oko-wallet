import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { RouteProp, useRoute } from '@react-navigation/native';
import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';
import React, { FC } from 'react';
import { View } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { NetworkTypeEnum } from '../../enums/network-type.enum';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useSelectedAccountSelector, useSelectedNetworkSelector } from '../../store/wallet/wallet.selectors';
import { getNetworkType } from '../../utils/network.util';

import { EvmConfirmation } from './components/evm-confirmation/evm-confirmation';
import { TezosConfirmation } from './components/tezos-confirmation/tezos-confirmation';

export const SendConfirmation: FC = () => {
  const {
    params: { transferParams }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.SendConfirmation>>();
  const network = useSelectedNetworkSelector();
  const account = useSelectedAccountSelector();

  const confirmationComponent =
    getNetworkType(network) === NetworkTypeEnum.Tezos ? (
      <TezosConfirmation network={network} sender={account} transferParams={transferParams as TezosTransferParams[]} />
    ) : (
      <EvmConfirmation network={network} sender={account} transferParams={transferParams as EvmTransferParams} />
    );

  return (
    <View>
      <NavigationBar />
      {confirmationComponent}
    </View>
  );
};
