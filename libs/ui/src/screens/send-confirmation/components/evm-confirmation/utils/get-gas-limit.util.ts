import { TransactionRequest } from '@ethersproject/abstract-provider';

import { getDefaultEvmProvider } from '../../../../../utils/get-default-evm-provider.utils';

export const getGasLimit = (publicKeyHash: string, rpcUrl: string, transactionParams: TransactionRequest) => {
  const provider = getDefaultEvmProvider(rpcUrl);

  return provider
    .estimateGas({
      from: publicKeyHash,
      ...transactionParams
    })
    .then(gasLimit => gasLimit)
    .catch(console.log);
};
