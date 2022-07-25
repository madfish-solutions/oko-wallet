import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';

export interface TransactionParams extends Pick<TransactionRequest, 'to' | 'value' | 'gasLimit' | 'gasPrice'> {
  tokenAddress: string;
  tokenId?: string;
}

export interface GetEvmSignerParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<TransactionResponse>;
  transactionParams: TransactionParams;
  isGasToken: boolean;
  isNft: boolean;
}
