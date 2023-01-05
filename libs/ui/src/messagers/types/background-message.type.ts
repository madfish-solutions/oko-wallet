import { BackgroundMessageType } from '../enums/background-message-type.enum';
import { E2eMessageType } from '../enums/e2e-message-type.enum';

interface GetPasswordHashMessage {
  type: BackgroundMessageType.GetPasswordHash;
}

interface SetPasswordHashMessage {
  type: BackgroundMessageType.SetPasswordHash;
  data: {
    passwordHash: string;
  };
}

interface E2eClearStorageMessage {
  type: E2eMessageType.ClearStorage;
}

export type BackgroundMessage = GetPasswordHashMessage | SetPasswordHashMessage | E2eClearStorageMessage;
