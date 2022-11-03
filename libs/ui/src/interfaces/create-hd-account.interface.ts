import { Dispatch } from '@reduxjs/toolkit';
import { OnEventFn } from '@rnw-community/shared';
import { Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';

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
