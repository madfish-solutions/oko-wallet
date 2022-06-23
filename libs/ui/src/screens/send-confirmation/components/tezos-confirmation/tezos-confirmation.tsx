import { TransferParams as TezosTransferParams } from '@taquito/taquito';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { formatUnits } from '../../../../utils/units.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useTezosEstimations } from './hooks/use-tezos-estimations.hook';
import { useTezosFees } from './hooks/use-tezos-fees.hook';

interface Props extends ConfirmationProps {
  transferParams: TezosTransferParams[];
}

export const TezosConfirmation: FC<Props> = ({ network, sender, transferParams }) => {
  const { getTezosSigner } = useShelter();
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const fees = useTezosFees(transferParams, estimations);
  const [transactionHash, setTransactionHash] = useState('');

  const minimalFeePerStorageByteMutez = estimations[0]?.minimalFeePerStorageByteMutez ?? 0;
  const {
    rpcUrl,
    gasTokenMetadata: { decimals },
    networkType
  } = network;
  const { storageLimit, gasLimit, fee, revealGasFee } = fees;

  const storageFee = storageLimit && formatUnits(storageLimit * minimalFeePerStorageByteMutez, decimals);
  const formattedFee = fee && formatUnits(fee, decimals);

  const onSend = useCallback(
    () =>
      getTezosSigner({
        rpcUrl,
        publicKeyHash: getPublicKeyHash(sender, networkType),
        // Tezos Taquito will add revealGasGee by himself
        transactionParams: { ...transferParams[0], fee: fee - revealGasFee, storageLimit, gasLimit },
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
        <Text>Amount: {transferParams[0].amount}</Text>
        <Text>Storage limit: {storageLimit}</Text>
        {storageLimit > 0 && <Text>Storage Fee: {storageFee}</Text>}
        <Text>Gas limit: {gasLimit}</Text>
        <Text>TX Fee: {formattedFee}</Text>
      </>
    </Confirmation>
  );
};
