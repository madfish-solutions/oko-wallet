import { TransactionResponse } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren } from 'react';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { EvmTransferParams } from '../../types';

import { EvmConfirmationContainer } from './components/evm-confirmation-container/evm-confirmation-container';

type Props = PropsWithChildren<{
  transferParams: EvmTransferParams;
  messageID?: string;
  onConfirm?: (successCallback: OnEventFn<TransactionResponse>, gasPrice: number) => void;
}>;

export const EvmConfirmation: FC<Props> = ({ transferParams, onConfirm, children }) => {
  const { goBack } = useNavigation();

  return (
    <EvmConfirmationContainer
      transferParams={transferParams}
      onDecline={goBack}
      children={children}
      onConfirm={onConfirm}
    />
  );
};
