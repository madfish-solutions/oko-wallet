/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import {
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector
} from '../../../../store/wallet/wallet.selectors';
import { formatUnits } from '../../../../utils/units.utils';
import { Confirmation } from '../confirmation/confirmation';

import { GAS_LIMIT } from './constants/ethereum-gas-limit';
import { useEvmEstimations } from './hooks/use-evm-estimations.hook';

interface Props {
  transferParams: EvmTransferParams;
}

export const EvmConfirmation: FC<Props> = ({ transferParams }) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const network = useSelectedNetworkSelector();

  const { getEvmSigner } = useShelter();
  const { estimations, isLoading } = useEvmEstimations(network);

  const [transactionHash, setTransactionHash] = useState('');

  const {
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const gasPrice = estimations?.gasPrice && formatUnits(estimations.gasPrice, decimals);
  const transactionFee = estimations?.gasPrice && formatUnits(Number(estimations.gasPrice) * GAS_LIMIT, decimals);

  const getNumber = (value: number | ethers.BigNumberish | undefined) => (value ? Number(value) : 0);

  const gasPriceParam = estimations?.gasPrice ? getNumber(estimations.gasPrice) : getNumber(transferParams.gasPrice);

  console.log('LOGGER: estimated', {
    rpcUrl,
    publicKeyHash,
    transactionParams: {
      ...estimations,
      gasPrice: gasPriceParam,
      gasLimit: transferParams?.gasLimit ? getNumber(transferParams.gasLimit) * 1.5 : GAS_LIMIT,
      to: transferParams.to,
      value: ethers.utils.parseUnits(transferParams.value?.toString() as string)
    }
  });

  const onSend = useCallback(() => {
    if (estimations?.gasPrice) {
      const transactionParams = {
        gasPrice: gasPriceParam,
        gasLimit: transferParams?.gasLimit ? getNumber(transferParams.gasLimit) * 1.5 : GAS_LIMIT,
        to: transferParams.to,
        value: ethers.utils.parseUnits(transferParams.value?.toString() as string)
      };

      getEvmSigner({
        rpcUrl,
        transactionParams,
        publicKeyHash,
        successCallback: transactionResponse => setTransactionHash(transactionResponse.hash)
      });
    }
  }, [estimations]);

  return (
    <Confirmation
      isLoading={isLoading}
      transactionHash={transactionHash}
      network={network}
      onSend={onSend}
      transferParams={transferParams}
    >
      <>
        <Text>Amount: {transferParams.value?.toString()}</Text>
        <Text>Gas Price: {gasPrice}</Text>
        <Text>TX Fee: {transactionFee}</Text>
      </>
    </Confirmation>
  );
};
