import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';

export type TransferParams = TezosTransferParams[] | EvmTransferParams;
