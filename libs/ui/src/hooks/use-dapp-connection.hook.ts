import { isDefined } from '@rnw-community/shared';
import { parse } from 'query-string';
import { useEffect } from 'react';

import { globalNavigationRef } from '../components/navigator/navigator';
import { ScreensEnum } from '../enums/sreens.enum';
import { useIsAuthorisedSelector } from '../store/wallet/wallet.selectors';
import { isWeb } from '../utils/platform.utils';

import { useUnlock } from './use-unlock.hook';

export const useDappConnection = () => {
  const isAuthorised = useIsAuthorisedSelector();
  const { isLocked } = useUnlock();

  useEffect(() => {
    if (isDefined(globalNavigationRef.current) && isAuthorised) {
      if (isLocked) {
        globalNavigationRef.current.navigate(ScreensEnum.Unlock);
      }
      const query = parse(location.search);
      if (isWeb) {
        if (typeof query.origin === 'string' && typeof query.id === 'string' && globalNavigationRef.current !== null) {
          globalNavigationRef.current.navigate(ScreensEnum.DappConfirmation, {
            origin: query.origin,
            id: query.id
          });
        }
        if (
          typeof query.origin === 'string' &&
          typeof query.id === 'string' &&
          typeof query.chainId === 'string' &&
          query.chainId !== '' &&
          globalNavigationRef.current !== null
        ) {
          globalNavigationRef.current.navigate(ScreensEnum.ChangeNetworkConfirmation, {
            dAppOrigin: query.origin,
            messageId: query.id,
            requestedChainId: query.chainId
          });
        }
      }
    }
  }, [isLocked, globalNavigationRef.current, isAuthorised]);
};
