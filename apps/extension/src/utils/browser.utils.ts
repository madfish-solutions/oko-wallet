import { DAppInfo } from 'ui/background-script';
import { windows, runtime, Windows } from 'webextension-polyfill';

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
