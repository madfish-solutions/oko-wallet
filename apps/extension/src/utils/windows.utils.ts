import { POPUP_OPEN } from 'ui/background-script';
import { windows, runtime, Windows, Runtime } from 'webextension-polyfill';

const popupCreateData: Windows.CreateCreateDataType = {
  type: 'popup',
  width: 360,
  height: 600,
  top: 20,
  left: 20
};

export const openPopup = async (params: Record<string, string>, port: Runtime.Port) => {
  windows.create({
    ...popupCreateData,
    url: runtime.getURL(`popup.html?${new URLSearchParams(params).toString()}`)
  });
  port.postMessage({ type: POPUP_OPEN });
};
