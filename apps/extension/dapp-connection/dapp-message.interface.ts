import { DAppInfo } from '../../../libs/ui/src/store/dapps/dapps.state';

import { DAppMessageData } from './dapp-message-data.interface';

export interface DAppMessage {
  data: DAppMessageData;
  sender: DAppInfo;
}
