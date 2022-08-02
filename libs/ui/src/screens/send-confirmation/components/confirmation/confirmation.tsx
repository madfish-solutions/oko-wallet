import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { ScreenContainer } from '../../../../components/screen-container/screen-container/screen-container';
import { MainText } from '../../../../components/text/text';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { getString } from '../../../../utils/get-string.utils';

import { TransactionInfo } from './transaction-info/transaction-info';

interface Props {
  isLoading: boolean;
  transactionHash: string;
  network: NetworkInterface;
  onSend: OnEventFn;
  transferParams?: EvmTransferParams;
  isTransactionLoading: boolean;
}

export const Confirmation: FC<Props> = ({
  children,
  isLoading,
  transactionHash,
  network,
  onSend,
  transferParams,
  isTransactionLoading
}) => (
  <ScreenContainer screenTitle="Confirmation">
    {(isLoading || isTransactionLoading) && <MainText>Loading...</MainText>}
    {!isLoading && (
      <>
        {children}
        {!transactionHash && (
          <Pressable onPress={onSend}>
            <MainText>Send</MainText>
          </Pressable>
        )}
      </>
    )}
    {!!transactionHash && (
      <TransactionInfo transactionHash={transactionHash} network={network} receiver={getString(transferParams?.to)} />
    )}
  </ScreenContainer>
);
