import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, Text, View } from 'react-native';

import { NetworkInterface } from '../../../../interfaces/network.interface';
import { TransferParams } from '../../../../interfaces/transfer-params.interface';

import { TransactionInfo } from './transaction-info/transaction-info';

interface Props {
  isLoading: boolean;
  transactionHash: string;
  network: NetworkInterface;
  onSend: OnEventFn;
  transferParams: TransferParams;
}

export const Confirmation: FC<Props> = ({ children, isLoading, transactionHash, network, onSend, transferParams }) => (
  <View>
    {isLoading && <Text>Loading...</Text>}
    {!isLoading && (
      <>
        <Text>To: {transferParams.to}</Text>
        {children}
        {!transactionHash && (
          <Pressable onPress={onSend}>
            <Text>Send</Text>
          </Pressable>
        )}
      </>
    )}
    {!!transactionHash && <TransactionInfo transactionHash={transactionHash} network={network} />}
  </View>
);
