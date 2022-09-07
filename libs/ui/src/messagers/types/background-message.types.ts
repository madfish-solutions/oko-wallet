import { BackgroundMessageType } from '../enums/background-message-types.enum';

interface GetPasswordHashMessage {
  type: BackgroundMessageType.GetPasswordHash;
}

interface SetPasswordHashMessage {
  type: BackgroundMessageType.SetPasswordHash;
  data: {
    passwordHash: string;
  };
}

export type BackgroundMessage = GetPasswordHashMessage | SetPasswordHashMessage;
