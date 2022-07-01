import { OnEventFn } from '@rnw-community/shared';
import { BatchOperation } from '@taquito/taquito';
import { ParamsWithKind } from '@taquito/taquito/dist/types/operations/types';

export interface GetTezosSignerParams {
  publicKeyHash: string;
  rpcUrl: string;
  successCallback: OnEventFn<BatchOperation>;
  transactionParams: ParamsWithKind[];
}
