import { DAppInfo } from 'ui/background-script';
import { windows, runtime, Windows } from 'webextension-polyfill';

import { DAppTransactionInfo } from '../../../../libs/ui/src/interfaces/dapp-info.interface';

const popupCreateData: Windows.CreateCreateDataType = {
  type: 'popup',
  width: 360,
  height: 600,
  top: 20,
  left: 20
};

export const openDAppConnectionConfirmationPopup = async (id: string, dAppInfo: DAppInfo) =>
  windows.create({
    ...popupCreateData,
    url: runtime.getURL(`popup.html?id=${id}&dAppInfo=${JSON.stringify(dAppInfo)}`)
  });

export const openNetworkChangeConfirmationPopup = async (id: string, origin: string, requestedChainId: string) =>
  windows.create({
    ...popupCreateData,
    url: runtime.getURL(`popup.html?&origin=${origin}&id=${id}&requestedChainId=${requestedChainId}`)
  });

export const openConfirmSendTransactionPopup = async (
  id: string,
  transactionInfo: DAppTransactionInfo,
  dappInfo: DAppInfo
) =>
  windows.create({
    ...popupCreateData,
    url: runtime.getURL(
      `popup.html?id=${id}&transactionInfo=${JSON.stringify(transactionInfo)}&dAppInfo=${JSON.stringify(dappInfo)}`
    )
  });
