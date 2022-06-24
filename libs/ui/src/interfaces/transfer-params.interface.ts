import { TransactionRequest as EvmTransferParams } from '@ethersproject/abstract-provider';
import { ParamsWithKind } from '@taquito/taquito';

export type TransferParams = ParamsWithKind[] | EvmTransferParams;
