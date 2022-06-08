import { TransferParams as TezosTransferParams } from '@taquito/taquito';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import { getString } from '../../../../utils/get-string.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useTezosEstimations } from './hooks/use-tezos-estimations.hook';

interface Props extends ConfirmationProps {
  transferParams: TezosTransferParams;
}

export const TezosConfirmation: FC<Props> = ({ network, sender, transferParams }) => {
  const { getTezosSigner } = useShelter();
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const [transactionHash, setTransactionHash] = useState('');

  const onSend = useCallback(
    () =>
      getTezosSigner({
        publicKeyHash: getString(sender.networksKeys[network.networkType]?.publicKeyHash),
        rpcUrl: network.rpcUrl,
        transactionParams: { ...transferParams, ...estimations },
        successCallback: transactionResponse => setTransactionHash(transactionResponse.hash)
      }),
    [estimations]
  );

  return (
    <Confirmation
      isLoading={isLoading}
      transactionHash={transactionHash}
      network={network}
      onSend={onSend}
      transferParams={transferParams}
    >
      <>
        <Text>Amount: {transferParams.amount}</Text>
        <Text>Storage limit: {estimations[0]?.storageLimit}</Text>
        <Text>Gas limit: {estimations[0]?.gasLimit}</Text>
        <Text>Fee: {estimations[0]?.suggestedFeeMutez}</Text>
      </>
    </Confirmation>
  );
};
