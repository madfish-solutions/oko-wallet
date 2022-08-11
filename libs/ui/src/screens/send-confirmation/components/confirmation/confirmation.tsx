import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable } from 'react-native';

import { SecondaryScreenContainer } from '../../../../components/screen-container/secondary-screen-container/secondary-screen-container';
import { Text } from '../../../../components/text/text';
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
  <SecondaryScreenContainer screenTitle="Confirmation">
    {(isLoading || isTransactionLoading) && <Text>Loading...</Text>}
    {!isLoading && (
      <>
        {children}
        {!transactionHash && (
          <Pressable onPress={onSend}>
            <Text>Send</Text>
          </Pressable>
        )}
      </>
    )}
    {!!transactionHash && (
      <TransactionInfo transactionHash={transactionHash} network={network} receiver={getString(transferParams?.to)} />
    )}
  </SecondaryScreenContainer>
);
