import { InitialState, NavigationState } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { isMobile, isWeb } from '../utils/platform.utils';
import { getStoredValue, setStoredValue } from '../utils/store.util';

export const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export const usePersistedNavigationState = () => {
  const [isReady, setIsReady] = useState(isMobile);
  const [initialState, setInitialState] = useState<InitialState>();

  useEffect(() => {
    if (!isReady) {
      if (isWeb) {
        getStoredValue<InitialState>(PERSISTENCE_KEY)
          .then(savedStateString => {
            const state = isDefined(savedStateString) ? savedStateString : undefined;

            if (state !== undefined) {
              setInitialState(state);
            }
          })
          .finally(() => setIsReady(true));
      } else {
        setIsReady(true);
      }
    }
  }, [isReady]);

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
