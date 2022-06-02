import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ethers } from 'ethers';
import React, { FC, useCallback, useState } from 'react';
import { Text } from 'react-native';

import { Shelter } from '../../../../shelter/shelter';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';
import { ConfirmationProps } from '../../types';
import { Confirmation } from '../confirmation/confirmation';

import { useEvmEstimations } from './hooks/use-evm-estimations.hook';

const GAS_LIMIT = 21000;

interface Props extends ConfirmationProps {
  transferParams: EvmTransferParams;
}

export const EvmConfirmation: FC<Props> = ({ network, sender, transferParams }) => {
  const { estimations, isLoading } = useEvmEstimations(network);
  const [transactionHash, setTransactionHash] = useState('');

  const onSend = useCallback(() => {
    const provider = getDefaultEvmProvider(network.rpcUrl);

    Shelter.getEvmSigner$(sender.publicKey, provider).subscribe(async signer => {
      if (estimations?.gasPrice) {
        const txSend = await signer.sendTransaction({
          gasPrice: estimations.gasPrice,
          gasLimit: GAS_LIMIT,
          to: transferParams.to,
          value: ethers.utils.parseUnits(transferParams.value as string)
        });

        setTransactionHash(txSend.hash);
      }
    });
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
