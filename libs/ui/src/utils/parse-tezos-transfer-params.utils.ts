import { OpKind, ParamsWithKind } from '@taquito/taquito';
import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';

export const parseTezosTransferParams = (transferParams: TezosTransferParams): ParamsWithKind[] => [
  { ...transferParams, kind: OpKind.TRANSACTION }
];
