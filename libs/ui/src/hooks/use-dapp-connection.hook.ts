import { parse } from 'query-string';
import { useEffect } from 'react';

import { globalNavigationRef } from '../components/navigator/navigator';
import { ScreensEnum } from '../enums/sreens.enum';
import { isWeb } from '../utils/platform.utils';

export const useDappConnection = () => {
  useEffect(() => {
    if (isWeb) {
      const query = parse(location.search);
      if (
        Boolean(query?.confirmation) === true &&
        typeof query.origin === 'string' &&
        typeof query.id === 'string' &&
        globalNavigationRef.current !== null
      ) {
        globalNavigationRef.current.navigate(ScreensEnum.DappConfirmation, {
          dappName: query.origin,
          id: query.id
        });
      }
    }
  }, [globalNavigationRef.current]);
};
