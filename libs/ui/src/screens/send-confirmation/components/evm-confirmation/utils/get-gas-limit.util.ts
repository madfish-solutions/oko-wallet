import { TransactionRequest } from '@ethersproject/abstract-provider';
import { getDefaultEvmProvider } from 'shelter';

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
