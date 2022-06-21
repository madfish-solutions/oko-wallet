import { Dispatch } from '@reduxjs/toolkit';
import { Subject } from 'rxjs';

import { NetworkTypeEnum } from '../enums/network-type.enum';

import { AccountInterface } from './account.interface';

export interface CreateHdAccountParams {
  accountIndex: number;
  networkType: NetworkTypeEnum;
}

export type CreateHdAccountType = {
  createHdAccount$: Subject<CreateHdAccountParams>;
  dispatch: Dispatch;
};

export interface CreateHdAccountForNewNetworkParams {
  account: AccountInterface;
  networkType: NetworkTypeEnum;
  callback?: () => void;
}

export type CreateHdAccountForNewNetworkType = {
  createHdAccountForNewNetworkType$: Subject<CreateHdAccountForNewNetworkParams>;
  dispatch: Dispatch;
};
