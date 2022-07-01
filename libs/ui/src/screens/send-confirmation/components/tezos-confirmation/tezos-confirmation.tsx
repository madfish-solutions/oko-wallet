import { ParamsWithKind, OpKind } from '@taquito/taquito';
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
  transferParams: ParamsWithKind[];
}

export const TezosConfirmation: FC<Props> = ({ network, sender, transferParams }) => {
  const { sendTezosTransaction } = useShelter();
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const { storageLimitSum, gasFeeSum, revealGasFee, transferParamsWithFees, isOneOperation } = useTezosFees(
    transferParams,
    estimations
  );
  const [transactionHash, setTransactionHash] = useState('');

  const minimalFeePerStorageByteMutez = estimations[0]?.minimalFeePerStorageByteMutez ?? 0;
  const {
    rpcUrl,
    gasTokenMetadata: { decimals },
    networkType
  } = network;

  const storageFee = storageLimitSum && formatUnits(storageLimitSum * minimalFeePerStorageByteMutez, decimals);
  const formattedFee = gasFeeSum && formatUnits(gasFeeSum, decimals);

  const onSend = useCallback(() => {
    // Tezos Taquito will add revealGasGee by himself
    const feeToSend = gasFeeSum - revealGasFee;

    const transactionParams = transferParamsWithFees.map((transferParam, index) => {
      const isLastOpParam = index === transferParams.length - 1;

      if (transferParam.kind !== OpKind.ACTIVATION) {
        const correctTransferParam = { ...transferParam };

        if (feeToSend) {
          correctTransferParam.fee = isLastOpParam ? feeToSend : 0;
        }

        if (storageLimitSum && isOneOperation) {
          correctTransferParam.storageLimit = storageLimitSum;
        }

        return correctTransferParam;
      }

      return transferParam;
    });

    sendTezosTransaction({
      transactionParams,
      rpcUrl,
      publicKeyHash: getPublicKeyHash(sender, networkType),
      successCallback: transactionResponse => setTransactionHash(transactionResponse.hash)
    });
  }, [estimations]);

  return (
    <Confirmation isLoading={isLoading} transactionHash={transactionHash} network={network} onSend={onSend}>
      <>
        <Text>Storage limit: {storageLimitSum}</Text>
        {storageLimitSum > 0 && <Text>Storage Fee: {storageFee}</Text>}
        <Text>TX Fee: {formattedFee}</Text>
      </>
    </Confirmation>
  );
};
