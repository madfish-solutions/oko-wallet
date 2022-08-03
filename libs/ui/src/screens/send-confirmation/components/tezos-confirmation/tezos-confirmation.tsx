import { ParamsWithKind, OpKind } from '@taquito/taquito';
import React, { FC, useCallback } from 'react';

import { Text } from '../../../../components/text/text';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import {
  useSelectedAccountSelector,
  useSelectedNetworkSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../../utils/units.utils';
import { useTransactionHook } from '../../hooks/use-transaction.hook';
import { Confirmation } from '../confirmation/confirmation';

import { useTezosEstimations } from './hooks/use-tezos-estimations.hook';
import { useTezosFees } from './hooks/use-tezos-fees.hook';

interface Props {
  transferParams: ParamsWithKind[];
}

export const TezosConfirmation: FC<Props> = ({ transferParams }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const sender = useSelectedAccountSelector();
  const network = useSelectedNetworkSelector();
  const { sendTezosTransaction } = useShelter();
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const { storageLimitSum, gasFeeSum, revealGasFee, transferParamsWithFees, isOneOperation } = useTezosFees(
    transferParams,
    estimations
  );
  const { transactionHash, isTransactionLoading, setIsTransactionLoading, successCallback } = useTransactionHook();

  const minimalFeePerStorageByteMutez = estimations[0]?.minimalFeePerStorageByteMutez ?? 0;
  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const storageFee = storageLimitSum && formatUnits(storageLimitSum * minimalFeePerStorageByteMutez, decimals);
  const formattedFee = gasFeeSum && formatUnits(gasFeeSum, decimals);

  const onSend = useCallback(() => {
    setIsTransactionLoading(true);

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
      publicKeyHash,
      successCallback
    });
  }, [estimations]);

  return (
    <Confirmation
      isLoading={isLoading}
      transactionHash={transactionHash}
      network={network}
      onSend={onSend}
      isTransactionLoading={isTransactionLoading}
    >
      <>
        <Text>Storage limit: {storageLimitSum}</Text>
        {storageLimitSum > 0 && <Text>Storage Fee: {storageFee}</Text>}
        <Text>TX Fee: {formattedFee}</Text>
      </>
    </Confirmation>
  );
};
