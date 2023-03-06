import { Dispatch } from '@reduxjs/toolkit';
import { OnEventFn } from '@rnw-community/shared';
import { Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';
import { Toast } from '../hooks/use-toast.hook';

import { AccountInterface } from './account.interface';

export interface CreateHdAccountParams {
  accountId: number;
  accountIndex: number;
  networkType: NetworkTypeEnum;
  accountName: string;
  successCallback?: OnEventFn<void>;
}

export type CreateHdAccountType = {
  createHdAccount$: Subject<CreateHdAccountParams>;
  dispatch: Dispatch;
  showErrorToast: OnEventFn<Toast>;
  showSuccessToast: OnEventFn<Toast>;
};

export interface CreateHdAccountForNewNetworkParams {
  account: AccountInterface;
  accountIndex: number;
  networkType: NetworkTypeEnum;
  switchToNewAccount?: boolean;
  successCallback?: OnEventFn<AccountInterface>;
}

export type CreateHdAccountForNewNetworkType = {
  createHdAccountForNewNetworkType$: Subject<CreateHdAccountForNewNetworkParams>;
  dispatch: Dispatch;
  showErrorToast: OnEventFn<Toast>;
  showSuccessToast: OnEventFn<Toast>;
};

export type RevealSeedPhraseParams = {
  successCallback: OnEventFn<string>;
};

export type RevealPrivateKeyParams = {
  publicKeyHash: string;
  successCallback: OnEventFn<string>;
};

export type HdAccount = { publicKey: string; address: string; privateKey: string };

export type CreateImportedAccountParams = {
  name: string;
  hdAccount: HdAccount;
  networkType: NetworkTypeEnum;
  accountId: number;
};

export type SignedMessageParams = {
  publicKey: string;
  messageToSign: string;
  method: string;
  successCallback: OnEventFn<string>;
};
