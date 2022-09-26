import React, { FC, useCallback } from 'react';

import { Text } from '../../../../components/text/text';
import { AssetTypeEnum } from '../../../../enums/asset-type.enum';
import { useShelter } from '../../../../hooks/use-shelter.hook';
import { TransactionParams } from '../../../../shelter/interfaces/get-evm-signer-params.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { getAssetType } from '../../../../utils/get-asset-type.util';
import { formatUnitsToString } from '../../../../utils/units.utils';
import { useTransactionHook } from '../../hooks/use-transaction.hook';
import { EvmTransferParams } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useEvmEstimations } from './hooks/use-evm-estimations.hook';
import { getAmount } from './utils/get-amount.util';

interface Props {
  transferParams: EvmTransferParams;
}

export const EvmConfirmation: FC<Props> = ({ transferParams: { asset, receiverPublicKeyHash, value } }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const { sendEvmTransaction } = useShelter();
  const { transactionHash, isTransactionLoading, setIsTransactionLoading, successCallback } = useTransactionHook();

  const { tokenAddress, tokenId, decimals } = asset;
  const assetType = getAssetType(asset);

  const { estimations, isLoading } = useEvmEstimations({
    network,
    asset,
    receiverPublicKeyHash,
    value,
    publicKeyHash,
    assetType
  });

  const {
    rpcUrl,
    gasTokenMetadata: { decimals: gasTokenDecimals }
  } = network;
  const gasPrice = estimations?.gasPrice && formatUnitsToString(estimations.gasPrice, gasTokenDecimals);
  const transactionFee =
    estimations?.gasPrice &&
    formatUnitsToString((Number(estimations.gasPrice) * Number(estimations.gasLimit)).toFixed(0), gasTokenDecimals);

  const onSend = useCallback(() => {
    if (estimations?.gasPrice) {
      setIsTransactionLoading(true);

      const transactionParams: TransactionParams = {
        gasPrice: estimations.gasPrice,
        gasLimit: Number(estimations.gasLimit),
        receiverPublicKeyHash,
        tokenAddress,
        tokenId,
        ...(assetType !== AssetTypeEnum.Collectible && {
          value: getAmount(value, decimals)
        })
      };

      sendEvmTransaction({
        rpcUrl,
        transactionParams,
        publicKeyHash,
        assetType,
        successCallback
      });
    }
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
        <Text>To: {receiverPublicKeyHash}</Text>
        <Text>Amount: {value}</Text>
        <Text>Gas Price: {gasPrice}</Text>
        <Text>TX Fee: {transactionFee}</Text>
      </>
    </Confirmation>
  );
};
