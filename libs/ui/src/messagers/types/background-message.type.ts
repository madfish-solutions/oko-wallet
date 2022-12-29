import { BackgroundMessageType } from '../enums/background-message-type.enum';
import { E2eMessageType } from '../enums/e2e-message-type.enum';

export interface GetPasswordHashMessage {
  type: BackgroundMessageType.GetPasswordHash;
}

export interface SetPasswordHashMessage {
  type: BackgroundMessageType.SetPasswordHash;
  data: {
    passwordHash: string;
  };
}

export interface SetLockTimePeriodMessage {
  type: BackgroundMessageType.SetLockTimePeriod;
  data: {
    lockTimePeriod: number;
  };
}

interface E2eClearStorageMessage {
  type: E2eMessageType.ClearStorage;
}

export type BackgroundMessage =
  | GetPasswordHashMessage
  | SetPasswordHashMessage
  | E2eClearStorageMessage
  | SetLockTimePeriodMessage;
