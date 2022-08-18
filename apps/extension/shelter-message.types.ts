import { BackgroundMessageTypes } from '../../libs/ui/src/shelter/shelter-message';

interface SetUserPassword {
  type: BackgroundMessageTypes.SetUserPassword;
  data: {
    password: string;
  };
}

interface GetUserPassword {
  type: BackgroundMessageTypes.GetUserPassword;
}

export type MessagePayloadTypes = SetUserPassword | GetUserPassword;
