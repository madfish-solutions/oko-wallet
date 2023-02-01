import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, PropsWithChildren, useCallback } from 'react';

import { AssetTypeEnum } from '../../../../../../enums/asset-type.enum';
import { useShelter } from '../../../../../../hooks/use-shelter.hook';
import { TransactionParams } from '../../../../../../shelter/interfaces/get-evm-signer-params.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { getAssetType } from '../../../../../../utils/get-asset-type.util';
import { EMPTY_GAS } from '../../../../constants';
import { useTransactionHook } from '../../../../hooks/use-transaction.hook';
import { EvmTransferParams, OnSend } from '../../../../types';
import { Confirmation } from '../../../confirmation/confirmation';
import { useEvmEstimations } from '../../hooks/use-evm-estimations.hook';
import { getAmount } from '../../utils/get-amount.util';

type Props = PropsWithChildren<{
  transferParams: EvmTransferParams;
  messageID?: string;
  onDecline: OnEventFn<void>;
  additionalSuccessCallback?: OnEventFn<TransactionResponse>;
  onConfirm?: (successCallback: OnEventFn<TransactionResponse>, gasPrice: number) => void;
}>;

export const EvmConfirmationContainer: FC<Props> = ({
  transferParams: { asset, receiverPublicKeyHash, value, data = '0x', gas = EMPTY_GAS },
  onDecline,
  onConfirm,
  additionalSuccessCallback,
  children
}) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const { sendEvmTransaction } = useShelter();

  const { tokenAddress, tokenId, decimals, symbol, standard } = asset;
  const { isTransactionLoading, setIsTransactionLoading, successCallback, errorCallback } = useTransactionHook(
    receiverPublicKeyHash,
    asset
  );

  const assetType = getAssetType(asset);

  const { estimations, isLoading } = useEvmEstimations({
    network,
    asset,
    receiverPublicKeyHash,
    value,
    publicKeyHash,
    assetType,
    gas
  });

  const gasLimit = gas > EMPTY_GAS ? gas : Number(estimations?.gasLimit);

  const { rpcUrl } = network;
  const transactionFee = isDefined(estimations?.gasPrice) ? Number(estimations?.gasPrice) * gasLimit : 0;

  const onSend: OnSend = useCallback(
    gasPriceCoefficient => {
      const onSuccessTransaction = (transactionResponse: TransactionResponse) => {
        successCallback(transactionResponse);

        additionalSuccessCallback?.(transactionResponse);
      };

      if (isDefined(estimations?.gasPrice) && typeof gasPriceCoefficient === 'number') {
        setIsTransactionLoading(true);
        const gasPrice = Math.trunc(Number(estimations?.gasPrice) * gasPriceCoefficient);

        if (isDefined(onConfirm)) {
          onConfirm(onSuccessTransaction, gasPrice);
        } else {
          const valueToSend =
            assetType === AssetTypeEnum.GasToken || assetType === AssetTypeEnum.Token
              ? getAmount(value, decimals)
              : value;

          const transactionParams: TransactionParams = {
            gasPrice,
            gasLimit,
            receiverPublicKeyHash,
            tokenAddress,
            tokenId,
            data,
            value: valueToSend
          };

          sendEvmTransaction({
            rpcUrl,
            transactionParams,
            publicKeyHash,
            assetType,
            successCallback: onSuccessTransaction,
            errorCallback,
            standard
          });
        }
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
