import { useEffect } from 'react';

import { sendErrorToDAppAndClosePopup } from '../utils/dapp.utils';

export const useClosePopup = (id: string, origin: string) => {
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      sendErrorToDAppAndClosePopup(id, origin);
    });

    return window.removeEventListener('beforeunload', () => {
      sendErrorToDAppAndClosePopup(id, origin);
    });
  }, []);
};
