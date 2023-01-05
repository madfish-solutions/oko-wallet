import { runtime } from 'webextension-polyfill';

import { BackgroundMessageType } from './enums/background-message-type.enum';
import { BackgroundMessage } from './types/background-message.type';

export class BackgroundMessager {
  private static sendMessage = (message: BackgroundMessage) => runtime.sendMessage(undefined, message);

  static getPasswordHash = () => BackgroundMessager.sendMessage({ type: BackgroundMessageType.GetPasswordHash });

  static setPasswordHash = (passwordHash: string) =>
    BackgroundMessager.sendMessage({
      type: BackgroundMessageType.SetPasswordHash,
      data: { passwordHash }
    });
}
