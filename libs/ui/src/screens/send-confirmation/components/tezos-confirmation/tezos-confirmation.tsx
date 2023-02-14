import { OpKind } from '@taquito/taquito';
import React, { FC, useCallback } from 'react';

import { useNavigation } from '../../../../hooks/use-navigation.hook';
import { useSendTezosTransaction } from '../../../../shelter/hooks/use-send-tezos-transaction.hook';
import {
  useSelectedAccountSelector,
  useSelectedNetworkSelector,
  useSelectedAccountPublicKeyHashSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits, parseUnits } from '../../../../utils/units.utils';
import { useTransactionHook } from '../../hooks/use-transaction.hook';
import { OnSend, TezosTransferParams } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useTezosEstimations } from './hooks/use-tezos-estimations.hook';
import { useTezosFees } from './hooks/use-tezos-fees.hook';

interface Props {
  transferParams: TezosTransferParams;
}

export const TezosConfirmation: FC<Props> = ({ transferParams: { transferParams, asset } }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const sender = useSelectedAccountSelector();
  const network = useSelectedNetworkSelector();
  const sendTezosTransaction = useSendTezosTransaction();
  const { goBack } = useNavigation();
  const { estimations, isLoading } = useTezosEstimations({ sender, transferParams, network });
  const { storageLimitSum, gasFeeSum, revealGasFee, transferParamsWithFees, isOneOperation } = useTezosFees(
    transferParams,
    estimations
  );

  // @ts-ignore
  const [{ to, amount }] = transferParams;

  const { symbol } = asset;
  const { isTransactionLoading, setIsTransactionLoading, successCallback, errorCallback } = useTransactionHook(
    to,
    asset
  );

  const minimalFeePerStorageByteMutez = estimations[0]?.minimalFeePerStorageByteMutez ?? 0;
  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const storageFee =
    storageLimitSum && formatUnits(storageLimitSum * minimalFeePerStorageByteMutez, decimals).toNumber();

  const onSend: OnSend = useCallback(
    arg => {
      if (typeof arg !== 'number') {
        setIsTransactionLoading(true);

        // Tezos Taquito will add revealGasGee by himself
        const feeToSend = arg.gasFee - revealGasFee;
        const transactionParams = transferParamsWithFees.map((transferParam, index) => {
          const isLastOpParam = index === transferParams.length - 1;

          if (transferParam.kind !== OpKind.ACTIVATION) {
            const correctTransferParam = { ...transferParam };

            if (feeToSend) {
              correctTransferParam.fee = isLastOpParam ? feeToSend : 0;
            }

            if (arg.storageFee && isOneOperation) {
              correctTransferParam.storageLimit = parseUnits(
                arg.storageFee / minimalFeePerStorageByteMutez,
                decimals
              ).toNumber();
            }

            return correctTransferParam;
          }

          return transferParam;
        });

        sendTezosTransaction({
          transactionParams,
          rpcUrl,
          publicKeyHash,
          successCallback,
          errorCallback
        });
      }
    },
    [estimations]
  );

  return (
    <Confirmation
      isFeeLoading={isLoading}
      onSend={onSend}
      onDecline={goBack}
      isTransactionLoading={isTransactionLoading}
      storageFee={storageFee}
      receiverPublicKeyHash={to}
      amount={amount}
      symbol={symbol}
      initialTransactionFee={gasFeeSum}
    />
  );
};
