import { isDefined } from '@rnw-community/shared';
import React, { FC, useCallback } from 'react';

import { AssetTypeEnum } from '../../../../enums/asset-type.enum';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { TransactionParams } from '../../../../shelter/interfaces/get-evm-signer-params.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getAssetType } from '../../../../utils/get-asset-type.util';
import { useTransactionHook } from '../../hooks/use-transaction.hook';
import { EvmTransferParams, OnSend } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useEvmEstimations } from './hooks/use-evm-estimations.hook';
import { getAmount } from './utils/get-amount.util';

interface Props {
  transferParams: EvmTransferParams;
  messageID?: string;
}

export const EvmConfirmation: FC<Props> = ({
  transferParams: { asset, receiverPublicKeyHash, value, data = '0x' },
  children
}) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const { sendEvmTransaction } = useShelter();
  const { isTransactionLoading, setIsTransactionLoading, successCallback, errorCallback } =
    useTransactionHook(receiverPublicKeyHash);

  const { tokenAddress, tokenId, decimals, symbol } = asset;
  const assetType = getAssetType(asset);

  const { estimations, isLoading } = useEvmEstimations({
    network,
    asset,
    receiverPublicKeyHash,
    value,
    publicKeyHash,
    assetType
  });

  const { rpcUrl } = network;
  const transactionFee = isDefined(estimations?.gasPrice)
    ? Number(estimations?.gasPrice) * Number(estimations?.gasLimit)
    : 0;

  const onSend: OnSend = useCallback(
    gasPriceCoefficient => {
      if (isDefined(estimations?.gasPrice) && typeof gasPriceCoefficient === 'number') {
        setIsTransactionLoading(true);

        const transactionParams: TransactionParams = {
          gasPrice: Math.trunc(Number(estimations?.gasPrice) * gasPriceCoefficient),
          gasLimit: Number(estimations?.gasLimit),
          receiverPublicKeyHash,
          tokenAddress,
          tokenId,
          data,
          ...(assetType !== AssetTypeEnum.Collectible && {
            value: getAmount(value, decimals)
          })
        };

        sendEvmTransaction({
          rpcUrl,
          transactionParams,
          publicKeyHash,
          assetType,
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
      isTransactionLoading={isTransactionLoading}
      receiverPublicKeyHash={receiverPublicKeyHash}
      amount={value}
      symbol={symbol}
      initialTransactionFee={transactionFee}
      children={children}
    />
  );
};
