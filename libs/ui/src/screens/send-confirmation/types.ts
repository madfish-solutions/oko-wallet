import { OnEventFn } from '@rnw-community/shared';
import { ParamsWithKind } from '@taquito/taquito/dist/types/operations/types';

import { Asset } from '../../interfaces/asset.interface';

export interface EvmTransferParams {
  receiverPublicKeyHash: string;
  asset: Asset;
  value: string;
  data?: string;
  gas?: number;
}

export interface TezosTransferParams {
  transferParams: ParamsWithKind[];
  asset: Asset;
}

type OnSendEvmArg = number;
type OnSendTezosArg = { storageFee: number; gasFee: number };
export type OnSend = OnEventFn<OnSendEvmArg | OnSendTezosArg>;
