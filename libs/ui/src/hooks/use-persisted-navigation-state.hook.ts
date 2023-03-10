import { InitialState, NavigationState } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { parse } from 'query-string';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { isWeb, getStoredValue, setStoredValue } from 'shared';

import { ScreensEnum } from '../enums/sreens.enum';
import { Mutable } from '../types/mutable.type';
import { createNavigationRoute } from '../utils/navigation.utils';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const ROUTES_TO_IGNORE: string[] = [
  ScreensEnum.DAppConnectionConfirmation,
  ScreensEnum.NetworkChangeConfirmation,
  ScreensEnum.DAppTransactionConfirmation,
  ScreensEnum.DAppSignConfirmation,
  ScreensEnum.Unlock,
  ScreensEnum.VerifyMnemonic,
  ScreensEnum.AlmostDone
];

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
          if (
            typeof query.id === 'string' &&
            typeof query.dAppInfo === 'string' &&
            query.transactionInfo === undefined &&
            query.signInfo === undefined
          ) {
            const route = createNavigationRoute(ScreensEnum.DAppConnectionConfirmation, {
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
            const route = createNavigationRoute(ScreensEnum.NetworkChangeConfirmation, {
              messageId: query.id,
              dAppOrigin: query.origin,
              requestedChainId: query.requestedChainId
            });

            storedInitialState.routes.push(route);
          }

          //Confirm transaction from dApp
          if (
            typeof query.id === 'string' &&
            typeof query.transactionInfo === 'string' &&
            typeof query.dAppInfo === 'string'
          ) {
            const route = createNavigationRoute(ScreensEnum.DAppTransactionConfirmation, {
              messageId: query.id,
              transactionInfo: JSON.parse(query.transactionInfo),
              dAppInfo: JSON.parse(query.dAppInfo)
            });

            storedInitialState.routes.push(route);
          }

          //Confirm sign from dApp
          if (
            typeof query.id === 'string' &&
            typeof query.signInfo === 'string' &&
            typeof query.dAppInfo === 'string' &&
            typeof query.method === 'string'
          ) {
            const route = createNavigationRoute(ScreensEnum.DAppSignConfirmation, {
              messageId: query.id,
              signInfo: JSON.parse(query.signInfo),
              dAppInfo: JSON.parse(query.dAppInfo),
              method: query.method
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
