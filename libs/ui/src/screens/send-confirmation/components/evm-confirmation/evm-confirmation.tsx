import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import { getString } from '../../../../utils/get-string.utils';
import { formatUnits } from '../../../../utils/units.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { GAS_LIMIT } from './constants/ethereum-gas-limit';
import { useEvmEstimations } from './hooks/use-evm-estimations.hook';

interface Props extends ConfirmationProps {
  transferParams: EvmTransferParams;
}

export const EvmConfirmation: FC<Props> = ({ network, sender: { networksKeys }, transferParams }) => {
  const { getEvmSigner } = useShelter();
  const { estimations, isLoading } = useEvmEstimations(network);
  const [transactionHash, setTransactionHash] = useState('');

  const {
    networkType,
    rpcUrl,
    gasTokenMetadata: { decimals }
  } = network;

  const gasPrice = estimations?.gasPrice && formatUnits(estimations.gasPrice, decimals);
  const transactionFee = estimations?.gasPrice && formatUnits(Number(estimations.gasPrice) * GAS_LIMIT, decimals);

  const onSend = useCallback(() => {
    if (estimations?.gasPrice) {
      const transactionParams = {
        gasPrice: estimations.gasPrice,
        gasLimit: GAS_LIMIT,
        to: transferParams.to,
        value: ethers.utils.parseUnits(transferParams.value as string)
      };

      getEvmSigner({
        rpcUrl,
        transactionParams,
        publicKeyHash: getString(networksKeys[networkType]?.publicKeyHash),
        successCallback: transactionResponse => setTransactionHash(transactionResponse.hash)
      });
    }
  }, [estimations]);

  return (
    <Confirmation isLoading={isLoading} transactionHash={transactionHash} network={network} onSend={onSend}>
      <>
        <Text>To: {transferParams.to}</Text>
        <Text>Amount: {transferParams.value}</Text>
        <Text>Gas Price: {gasPrice}</Text>
        <Text>TX Fee: {transactionFee}</Text>
      </>
    </Confirmation>
  );
};
