import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

import { NetworkInterface } from '../../../../interfaces/network.interface';
import { getString } from '../../../../utils/get-string.utils';

import { TransactionInfo } from './transaction-info/transaction-info';

interface Props {
  isLoading: boolean;
  transactionHash: string;
  network: NetworkInterface;
  onSend: OnEventFn;
  transferParams?: EvmTransferParams;
}

export const Confirmation: FC<Props> = ({ children, isLoading, transactionHash, network, onSend, transferParams }) => (
  <View>
    {isLoading && <Text>Loading...</Text>}
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
  </View>
);
