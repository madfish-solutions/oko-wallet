import { useEffect } from 'react';

import { globalNavigationRef } from '../components/navigator/navigator';
import { ScreensEnum } from '../enums/sreens.enum';
import { useIsAuthorisedSelector } from '../store/wallet/wallet.selectors';

import { useUnlock } from './use-unlock.hook';

export const useLockApp = (isNavigationReady: boolean) => {
  const { isLocked } = useUnlock();
  const isAuthorised = useIsAuthorisedSelector();

  useEffect(() => {
    if (isAuthorised && isNavigationReady && isLocked) {
      globalNavigationRef.current?.navigate(ScreensEnum.Unlock);
    }
  }, [isLocked, isAuthorised, isNavigationReady]);
};
