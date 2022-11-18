import { InitialState, NavigationState, Route } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { parse } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ScreensEnum, ScreensParamList } from '../enums/sreens.enum';
import { Mutable } from '../types/mutable.type';
import { isWeb } from '../utils/platform.utils';
import { getStoredValue, setStoredValue } from '../utils/store.util';

export const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const ROUTES_TO_IGNORE: string[] = [ScreensEnum.DAppConfirmation, ScreensEnum.ChangeNetworkConfirmation];

const createNavigationRoute = <T extends ScreensEnum>(name: T, params: ScreensParamList[T]): Omit<Route<T>, 'key'> => ({
  name,
  params
});

export const usePersistedNavigationState = () => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState<InitialState>();

  useEffect(() => {
    (async () => {
      if (isWeb) {
        const storedInitialState = await getStoredValue<Mutable<InitialState>>(PERSISTENCE_KEY).catch(() => undefined);

        if (isDefined(storedInitialState)) {
          storedInitialState.routes = storedInitialState.routes.filter(route => !ROUTES_TO_IGNORE.includes(route.name));

          const query = parse(location.search);

          // DAppConfirmation
          if (typeof query.id === 'string' && typeof query.dAppInfo === 'string') {
            const route = createNavigationRoute(ScreensEnum.DAppConfirmation, {
              messageId: query.id,
              dAppInfo: JSON.parse(query.dAppInfo)
            });

            storedInitialState.routes.push(route);
          }

          // ChangeNetworkConfirmation
          if (
            typeof query.id === 'string' &&
            typeof query.origin === 'string' &&
            typeof query.requestedChainId === 'string'
          ) {
            const route = createNavigationRoute(ScreensEnum.ChangeNetworkConfirmation, {
              messageId: query.id,
              dAppOrigin: query.origin,
              requestedChainId: query.requestedChainId
            });

            storedInitialState.routes.push(route);
          }
        }

        setInitialState(storedInitialState);
      }

      setIsReady(true);
    })();
  }, []);

  const handleStateChange = useCallback(
    (state: NavigationState | undefined) => setStoredValue(PERSISTENCE_KEY, JSON.stringify(state)),
    []
  );

  return useMemo(
    () => ({
      isReady,
      initialState,
      handleStateChange
    }),
    [isReady, initialState, handleStateChange]
  );
};
