import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined, isNotEmptyString, OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren, useCallback, useMemo } from 'react';

import { useSendEvmTransaction } from '../../../../../../shelter/hooks/use-send-evm-transaction.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { EMPTY_GAS } from '../../../../constants';
import { OperationsEnum } from '../../../../enums';
import { useTransactionHook } from '../../../../hooks/use-transaction.hook';
import { EvmTransferParams, OnSend } from '../../../../types';
import { ApproveToken } from '../../../approve-token/approve-token';
import { Confirmation } from '../../../confirmation/confirmation';
import { SwapSummary } from '../../../swap-summary/swap-summary';
import { useEvmEstimations } from '../../hooks/use-evm-estimations.hook';
import { useModifyEvmTransactionParams } from '../../hooks/use-modify-evm-transaction-params.hook';

type Props = PropsWithChildren<{
  transferParams: EvmTransferParams;
  messageID?: string;
  onDecline: OnEventFn<void>;
  additionalSuccessCallback?: OnEventFn<TransactionResponse>;
  isDAppOperation?: boolean;
}>;

export const EvmConfirmationContainer: FC<Props> = ({
  transferParams,
  onDecline,
  additionalSuccessCallback,
  children,
  isDAppOperation = false
}) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const {
    token,
    receiverPublicKeyHash,
    value,
    transactionParams: initialTransactionParams,
    gas = EMPTY_GAS,
    operation = OperationsEnum.Send
  } = transferParams;

  const transactionParams = useModifyEvmTransactionParams(initialTransactionParams);
  const sendEvmTransaction = useSendEvmTransaction();

  const { estimations, isLoading } = useEvmEstimations({
    network,
    publicKeyHash,
    gas,
    transactionParams
  });

  const { isTransactionLoading, setIsTransactionLoading, successCallback, errorCallback } = useTransactionHook(
    receiverPublicKeyHash,
    token,
    operation,
    isDAppOperation,
    additionalSuccessCallback
  );

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

  const confirmOperationParams = useMemo(
    () => ({
      onSend,
      onDecline,
      isTransactionLoading,
      isFeeLoading: isLoading,
      initialTransactionFee: transactionFee
    }),
    [onSend, onDecline, isTransactionLoading, isLoading, transactionFee]
  );

  return operation === OperationsEnum.Approve &&
    isDefined(transferParams.dAppInfo) &&
    isNotEmptyString(transactionParams.data) ? (
    <ApproveToken
      confirmOperationParams={confirmOperationParams}
      token={token}
      data={transactionParams.data}
      dAppInfo={transferParams.dAppInfo}
    />
  ) : operation === OperationsEnum.InternalSwap && isDefined(transferParams.internalSwapDetails) ? (
    <SwapSummary
      confirmOperationParams={confirmOperationParams}
      fromToken={token}
      fromTokenAmount={value}
      internalSwapDetails={transferParams.internalSwapDetails}
    />
  ) : (
    <Confirmation
      confirmOperationParams={confirmOperationParams}
      receiverPublicKeyHash={receiverPublicKeyHash}
      amount={value}
      symbol={token.symbol}
      children={children}
    />
  );
};
