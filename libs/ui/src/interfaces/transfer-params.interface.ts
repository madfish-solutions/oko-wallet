import { TransactionResponse } from '@ethersproject/abstract-provider';
import { OnEventFn } from '@rnw-community/shared';

import { EvmTransferParams, TezosTransferParams } from '../screens/send-confirmation/types';

export type TransferParams = TezosTransferParams | EvmTransferParams;

export type SignEvmDataParams = {
  rpcUrl: string;
  publicKeyHash: string;
  data: object;
  successCallback: OnEventFn<TransactionResponse>;
};
