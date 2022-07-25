import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import React, { FC } from 'react';
import { Pressable, Text } from 'react-native';

import { ScreenContainer } from '../../../../components/screen-container/screen-container/screen-container';
import { NetworkInterface } from '../../../../interfaces/network.interface';
import { getString } from '../../../../utils/get-string.utils';
import { styles } from '../../send-confirmation.styles';

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
    {(isLoading || isTransactionLoading) && <Text style={styles.text}>Loading...</Text>}
    {!isLoading && (
      <>
        {children}
        {!transactionHash && (
          <Pressable onPress={onSend}>
            <Text style={styles.text}>Send</Text>
          </Pressable>
        )}
      </>
    )}
    {!!transactionHash && (
      <TransactionInfo transactionHash={transactionHash} network={network} receiver={getString(transferParams?.to)} />
    )}
  </ScreenContainer>
);
