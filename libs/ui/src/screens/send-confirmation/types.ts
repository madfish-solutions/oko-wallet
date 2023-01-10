import { OnEventFn } from '@rnw-community/shared';
import { ParamsWithKind } from '@taquito/taquito/dist/types/operations/types';

import { Asset } from '../../interfaces/asset.interface';

export interface EvmTransferParams {
  receiverPublicKeyHash: string;
  asset: Asset;
  value: string;
  data?: string;
  gas?: string;
}

export interface TezosTransferParams {
  transferParams: ParamsWithKind[];
  asset: Asset;
}

export type OnSendEvmArg = number;
export type OnSendTezosArg = { storageFee: number; gasFee: number };
export type OnSend = OnEventFn<OnSendEvmArg | OnSendTezosArg>;
