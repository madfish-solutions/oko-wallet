import { BackgroundMessageTypes } from '../../libs/ui/src/shelter/shelter-message';

interface SaveUserPassword {
  type: BackgroundMessageTypes.SetUserPassword;
  data: {
    password: string;
  };
}

interface GetUserPassword {
  type: BackgroundMessageTypes.GetUserPassword;
}

export type MessagePayloadTypes = SaveUserPassword | GetUserPassword;
