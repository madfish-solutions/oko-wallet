import { TransactionResponse } from '@ethersproject/abstract-provider';
import { isDefined, OnEventFn } from '@rnw-community/shared';
import React, { FC, useCallback } from 'react';

import { AssetTypeEnum } from '../../../../../../enums/asset-type.enum';
import { useShelter } from '../../../../../../hooks/use-shelter.hook';
import { TransactionParams } from '../../../../../../shelter/interfaces/get-evm-signer-params.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../../../store/wallet/wallet.selectors';
import { getAssetType } from '../../../../../../utils/get-asset-type.util';
import { useTransactionHook } from '../../../../hooks/use-transaction.hook';
import { EvmTransferParams, OnSend } from '../../../../types';
import { Confirmation } from '../../../confirmation/confirmation';
import { useEvmEstimations } from '../../hooks/use-evm-estimations.hook';
import { getAmount } from '../../utils/get-amount.util';

interface Props {
  transferParams: EvmTransferParams;
  messageID?: string;
  onDecline: OnEventFn<void>;
  additionalSuccessCallback?: OnEventFn<TransactionResponse>;
}

export const EvmConfirmationContainer: FC<Props> = ({
  transferParams: { asset, receiverPublicKeyHash, value, data = '0x', gas = undefined },
  onDecline,
  additionalSuccessCallback,
  children
}) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const { sendEvmTransaction } = useShelter();
  const { isTransactionLoading, setIsTransactionLoading, successCallback, errorCallback } =
    useTransactionHook(receiverPublicKeyHash);

  const { tokenAddress, tokenId, decimals, symbol, standard } = asset;
  const assetType = getAssetType(asset);

  const { estimations, isLoading } = useEvmEstimations({
    network,
    asset,
    receiverPublicKeyHash,
    value,
    publicKeyHash,
    assetType
  });

  const gasLimit = isDefined(gas) ? parseInt(gas, 16) : Number(estimations?.gasLimit);

  const { rpcUrl } = network;
  const transactionFee = isDefined(estimations?.gasPrice) ? Number(estimations?.gasPrice) * gasLimit : 0;

  const onSend: OnSend = useCallback(
    gasPriceCoefficient => {
      if (isDefined(estimations?.gasPrice) && typeof gasPriceCoefficient === 'number') {
        setIsTransactionLoading(true);
        const valueToSend =
          assetType === AssetTypeEnum.GasToken || assetType === AssetTypeEnum.Token
            ? getAmount(value, decimals).toString()
            : value;

        const transactionParams: TransactionParams = {
          gasPrice: Math.trunc(Number(estimations?.gasPrice) * gasPriceCoefficient),
          gasLimit,
          receiverPublicKeyHash,
          tokenAddress,
          tokenId,
          data,
          value: valueToSend
        };

        const onSuccessTransaction = (transactionResponse: TransactionResponse) => {
          successCallback(transactionResponse);

          additionalSuccessCallback?.(transactionResponse);
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
