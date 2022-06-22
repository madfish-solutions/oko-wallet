import { TransferParams as TezosTransferParams } from '@taquito/taquito';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedAccountSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../../utils/units.utils';
import { Confirmation } from '../confirmation/confirmation';

import { EstimationInterface, useTezosEstimations } from './hooks/use-tezos-estimations.hook';

interface Props {
  transferParams: TezosTransferParams;
}

export const TezosConfirmation: FC<Props> = ({ transferParams }) => {
  const { getTezosSigner } = useShelter();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const sender = useSelectedAccountSelector();
  const network = useSelectedNetworkSelector();

  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const [transactionHash, setTransactionHash] = useState('');

  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;
  const [{ storageLimit, gasLimit, suggestedFeeMutez, minimalFeePerStorageByteMutez } = {} as EstimationInterface] =
    estimations;

  const storageFee = storageLimit && formatUnits(storageLimit * minimalFeePerStorageByteMutez, decimals);
  const formattedSuggestedFeeMutez = suggestedFeeMutez && formatUnits(suggestedFeeMutez, decimals);

  const onSend = useCallback(
    () =>
      getTezosSigner({
        rpcUrl,
        publicKeyHash,
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
        <Text>Storage limit: {storageLimit}</Text>
        {storageLimit > 0 && <Text>Storage Fee: {storageFee}</Text>}
        <Text>Gas limit: {gasLimit}</Text>
        <Text>TX Fee: {formattedSuggestedFeeMutez}</Text>
      </>
    </Confirmation>
  );
};
