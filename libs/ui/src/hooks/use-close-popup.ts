import { useEffect } from 'react';

import { sendErrorToDAppAndClosePopup } from '../utils/dapp.utils';

export const useClosePopup = (id: string, origin: string) => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      sendErrorToDAppAndClosePopup(origin, id);
    });

    return window.removeEventListener('beforeunload', () => {
      sendErrorToDAppAndClosePopup(origin, id);
    });
  }, []);
};
