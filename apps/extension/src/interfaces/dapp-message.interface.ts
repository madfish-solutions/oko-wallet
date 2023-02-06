import { DAppInfo } from 'ui/background-script';

import { DAppMessageData } from './dapp-message-data.interface';

export interface DAppMessage {
  data: DAppMessageData;
  sender: DAppInfo;
}

export interface InformMessage {
  type: string;
}
