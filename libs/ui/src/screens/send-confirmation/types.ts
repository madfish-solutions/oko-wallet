import { TransactionRequest } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import { ParamsWithKind } from '@taquito/taquito/dist/types/operations/types';

import { Asset } from '../../interfaces/asset.interface';

export interface EvmTransferParams {
  receiverPublicKeyHash: string;
  asset: Asset;
  value: string;
  gas?: number;
  transactionParams: TransactionRequest;
}

export interface TezosTransferParams {
  transferParams: ParamsWithKind[];
  asset: Asset;
}

type OnSendEvmArg = number;
type OnSendTezosArg = { storageFee: number; gasFee: number };
export type OnSend = OnEventFn<OnSendEvmArg | OnSendTezosArg>;
