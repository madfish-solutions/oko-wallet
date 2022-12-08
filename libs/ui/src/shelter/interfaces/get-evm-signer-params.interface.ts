import { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';

import { AssetTypeEnum } from '../../enums/asset-type.enum';
import { TokenStandardEnum } from '../../enums/token-standard.enum';

export interface TransactionParams extends Pick<TransactionRequest, 'gasLimit' | 'gasPrice' | 'data'> {
  tokenAddress: string;
  receiverPublicKeyHash: string;
  tokenId?: string;
  value: string;
}

export interface GetEvmSignerParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<TransactionResponse>;
  errorCallback: OnEventFn<void>;
  transactionParams: TransactionParams;
  assetType: AssetTypeEnum;
  standard?: TokenStandardEnum;
}
