import { isString } from '@rnw-community/shared';
import { ethers } from 'ethers';
import React, { FC, useCallback } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import { TransactionParams } from '../../../../shelter/interfaces/get-evm-signer-params.interface';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../../utils/units.utils';
import { useTransactionHook } from '../../hooks/use-transaction.hook';
import { styles } from '../../send-confirmation.styles';
import { EvmTransferParams } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useEvmEstimations } from './hooks/use-evm-estimations.hook';

interface Props {
  transferParams: EvmTransferParams;
}

export const EvmConfirmation: FC<Props> = ({ transferParams: { asset, to, value } }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();
  const { sendEvmTransaction } = useShelter();
  const { transactionHash, isTransactionLoading, setIsTransactionLoading, successCallback } = useTransactionHook();

  const { tokenAddress, tokenId, decimals } = asset;
  const isGasToken = !tokenAddress;
  const isNft = isString(tokenId) && tokenId.length > 0;

  const { estimations, isLoading } = useEvmEstimations({ network, asset, to, value, publicKeyHash, isGasToken, isNft });

  const {
    rpcUrl,
    gasTokenMetadata: { decimals: gasTokenDecimals }
  } = network;
  const gasPrice = estimations?.gasPrice && formatUnits(estimations.gasPrice, gasTokenDecimals);
  const transactionFee =
    estimations?.gasPrice &&
    formatUnits((Number(estimations.gasPrice) * Number(estimations.gasLimit)).toFixed(0), gasTokenDecimals);

  const onSend = useCallback(() => {
    if (estimations?.gasPrice) {
      setIsTransactionLoading(true);

      const transactionParams: TransactionParams = {
        gasPrice: estimations.gasPrice,
        gasLimit: estimations.gasLimit,
        to,
        tokenAddress,
        tokenId,
        ...(!isNft && {
          value: ethers.utils.parseUnits(value, decimals)
        })
      };

      sendEvmTransaction({
        rpcUrl,
        transactionParams,
        publicKeyHash,
        isGasToken,
        isNft,
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
        <Text style={styles.text}>To: {to}</Text>
        <Text style={styles.text}>Amount: {value}</Text>
        <Text style={styles.text}>Gas Price: {gasPrice}</Text>
        <Text style={styles.text}>TX Fee: {transactionFee}</Text>
      </>
    </Confirmation>
  );
};
