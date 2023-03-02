import { TransactionRequest } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';
import { ParamsWithKind } from '@taquito/taquito/dist/types/operations/types';

import { DAppInfo } from '../../interfaces/dapp-info.interface';
import { Token } from '../../interfaces/token.interface';

import { InternalSwapDetails } from './components/evm-confirmation/types';
import { OperationsEnum } from './enums';

export interface EvmTransferParams {
  receiverPublicKeyHash: string;
  token: Token;
  value: string;
  gas?: number;
  transactionParams: TransactionRequest;
  operation?: OperationsEnum;
  dAppInfo?: DAppInfo;
  internalSwapDetails?: InternalSwapDetails;
}

export interface TezosTransferParams {
  transferParams: ParamsWithKind[];
  token: Token;
  operation?: OperationsEnum;
}

type OnSendEvmArg = number;
type OnSendTezosArg = { storageFee: number; gasFee: number };
export type OnSend = OnEventFn<OnSendEvmArg | OnSendTezosArg>;
