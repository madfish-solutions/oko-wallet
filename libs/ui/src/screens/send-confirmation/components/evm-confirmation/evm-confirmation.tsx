import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { useShelter } from '../../../../hooks/use-shelter.hook';
import { getString } from '../../../../utils/get-string.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useEvmEstimations } from './hooks/use-evm-estimations.hook';

const GAS_LIMIT = 21000;

interface Props extends ConfirmationProps {
  transferParams: EvmTransferParams;
}

export const EvmConfirmation: FC<Props> = ({ network, sender: { networksKeys }, transferParams }) => {
  const { getEvmSigner } = useShelter();
  const { estimations, isLoading } = useEvmEstimations(network);
  const [transactionHash, setTransactionHash] = useState('');

  const onSend = useCallback(() => {
    if (estimations?.gasPrice) {
      const transactionParams = {
        gasPrice: estimations.gasPrice,
        gasLimit: GAS_LIMIT,
        to: transferParams.to,
        value: ethers.utils.parseUnits(transferParams.value as string)
      };

      getEvmSigner({
        transactionParams,
        publicKeyHash: getString(networksKeys[network.networkType]?.publicKeyHash),
        rpcUrl: network.rpcUrl,
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
        <Text>Amount: {transferParams.value}</Text>
        <Text>Gas Price: {estimations?.gasPrice?.toString()}</Text>
      </>
    </Confirmation>
  );
};
