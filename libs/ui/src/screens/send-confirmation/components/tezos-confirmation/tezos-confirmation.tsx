import { TransferParams as TezosTransferParams } from '@taquito/taquito';
import { BigNumber } from 'bignumber.js';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import { getPublicKeyHash } from '../../../../store/wallet/wallet.utils';
import { mutezToTz } from '../../../../utils/tezos.util';
import { formatUnits } from '../../../../utils/units.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { EstimationInterface, useTezosEstimations } from './hooks/use-tezos-estimations.hook';

interface Props extends ConfirmationProps {
  transferParams: TezosTransferParams;
}

export const TezosConfirmation: FC<Props> = ({ network, sender, transferParams }) => {
  const { getTezosSigner } = useShelter();
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const [transactionHash, setTransactionHash] = useState('');

  const {
    rpcUrl,
    gasTokenMetadata: { decimals },
    networkType
  } = network;
  const [{ storageLimit, gasLimit, suggestedFeeMutez, minimalFeePerStorageByteMutez } = {} as EstimationInterface] =
    estimations;

  const storageFee =
    storageLimit && mutezToTz(new BigNumber(storageLimit).times(minimalFeePerStorageByteMutez), decimals).toString();
  const formattedSuggestedFeeMutez = suggestedFeeMutez && formatUnits(suggestedFeeMutez, decimals);

  const onSend = useCallback(
    () =>
      getTezosSigner({
        rpcUrl,
        publicKeyHash: getPublicKeyHash(sender, networkType),
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
