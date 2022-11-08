import { parse } from 'query-string';
import { useEffect } from 'react';

import { globalNavigationRef } from '../components/navigator/navigator';
import { ScreensEnum } from '../enums/sreens.enum';
import { isWeb } from '../utils/platform.utils';

export const useDappConnection = () => {
  useEffect(() => {
    setTimeout(() => {
      if (isWeb) {
        const query = parse(location.search);
        console.log(query, 'query');
        if (typeof query.origin === 'string' && typeof query.id === 'string' && globalNavigationRef.current !== null) {
          globalNavigationRef.current.navigate(ScreensEnum.DappConfirmation, {
            dappName: query.origin,
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
            dappName: query.origin,
            id: query.id,
            chainId: query.chainId
          });
        }
      }
    }, 500);
  }, [globalNavigationRef.current]);
};
