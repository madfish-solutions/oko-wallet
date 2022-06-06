import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { Shelter } from '../../../../shelter/shelter';
import { parseTezosTransferParams } from '../../../../utils/parse-tezos-transfer-params.utils';
import { createTezosToolkit } from '../../../../utils/tezos-toolkit.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useTezosEstimations } from './hooks/use-tezos-estimations.hook';

interface Props extends ConfirmationProps {
  transferParams: TezosTransferParams;
}

export const TezosConfirmation: FC<Props> = ({ network, sender, transferParams }) => {
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const [transactionHash, setTransactionHash] = useState('');

  const onSend = useCallback(() => {
    Shelter.getTezosSigner$().subscribe(async signer => {
      const tezosToolkit = createTezosToolkit(network.rpcUrl);
      tezosToolkit.setSignerProvider(signer);

      const txSend = await tezosToolkit.contract
        .batch(parseTezosTransferParams({ ...transferParams, ...estimations }))
        .send();

      setTransactionHash(txSend.hash);
    });
  }, [estimations]);

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
