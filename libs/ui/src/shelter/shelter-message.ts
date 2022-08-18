import { browser } from 'webextension-polyfill-ts';

export enum BackgroundMessageTypes {
  SetUserPassword = 'SetUserPassword',
  GetUserPassword = 'GetUserPassword'
}

type MessagePayload<T> = {
  type: BackgroundMessageTypes;
  data?: Record<string, T>;
};

export class ShelterMessage {
  static sendMessage = async <T>(payload: MessagePayload<T>) => {
    const extensionId = undefined;
    const response = await browser.runtime.sendMessage(extensionId, payload);

    return response;
  };

  static setUserPassword = (password: string) =>
    this.sendMessage({ type: BackgroundMessageTypes.SetUserPassword, data: { password } });

  static getUserPassword = async () => {
    const resposne = await this.sendMessage({ type: BackgroundMessageTypes.GetUserPassword });

    return resposne;
  };
}
