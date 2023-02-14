import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren, useCallback } from 'react';

import { useSendEvmTransaction } from '../../../../../../shelter/hooks/use-send-evm-transaction.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { EMPTY_GAS } from '../../../../constants';
import { useTransactionHook } from '../../../../hooks/use-transaction.hook';
import { EvmTransferParams, OnSend } from '../../../../types';
import { Confirmation } from '../../../confirmation/confirmation';
import { useEvmEstimations } from '../../hooks/use-evm-estimations.hook';

type Props = PropsWithChildren<{
  transferParams: EvmTransferParams;
  messageID?: string;
  onDecline: OnEventFn<void>;
  additionalSuccessCallback?: OnEventFn<TransactionResponse>;
}>;

export const EvmConfirmationContainer: FC<Props> = ({
  transferParams: { asset, receiverPublicKeyHash, value, transactionParams, gas = EMPTY_GAS },
  onDecline,
  additionalSuccessCallback,
  children
}) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const sendEvmTransaction = useSendEvmTransaction();

  const { symbol } = asset;
  const { isTransactionLoading, setIsTransactionLoading, successCallback, errorCallback } = useTransactionHook(
    receiverPublicKeyHash,
    asset,
    additionalSuccessCallback
  );

  const { estimations, isLoading } = useEvmEstimations({
    network,
    asset,
    receiverPublicKeyHash,
    value,
    publicKeyHash,
    gas
  });

  const gasLimit = gas > EMPTY_GAS ? gas : Number(estimations?.gasLimit);

  const { rpcUrl } = network;
  const transactionFee = isDefined(estimations?.gasPrice) ? Number(estimations?.gasPrice) * gasLimit : 0;

  const onSend: OnSend = useCallback(
    gasPriceCoefficient => {
      if (isDefined(estimations?.gasPrice) && typeof gasPriceCoefficient === 'number') {
        setIsTransactionLoading(true);
        const gasPrice = Math.trunc(Number(estimations?.gasPrice) * gasPriceCoefficient);

        sendEvmTransaction({
          transactionParams: { ...transactionParams, gasLimit, gasPrice },
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
      onDecline={onDecline}
      isTransactionLoading={isTransactionLoading}
      receiverPublicKeyHash={receiverPublicKeyHash}
      amount={value}
      symbol={symbol}
      initialTransactionFee={transactionFee}
      children={children}
    />
  );
};
