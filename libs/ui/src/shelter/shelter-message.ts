import { browser } from 'webextension-polyfill-ts';

enum BackgroundMessageTypes {
  SaveUserPassword = 'SaveUserPassword',
  GetUserPassword = 'GetUserPassword'
}

type MessagePayload<T> = {
  type: BackgroundMessageTypes;
  data?: T;
};

const sendMessage = async <T>(payload: MessagePayload<T>) => {
  const extensionId = undefined;
  const response: MessagePayload<T> = await browser.runtime.sendMessage(extensionId, payload);

  return response;
};

export const saveUserPassword = async (password: string) =>
  sendMessage({ type: BackgroundMessageTypes.SaveUserPassword, data: password });

export const getUserPassword = async () => {
  const resposne = await sendMessage({ type: BackgroundMessageTypes.GetUserPassword });

  return resposne;
};
