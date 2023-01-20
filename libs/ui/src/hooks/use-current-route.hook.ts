import { useNavigationState } from '@react-navigation/native';
import { isDefined } from '@rnw-community/shared';
import { useMemo } from 'react';

export const useCurrentRoute = () => {
  const navigationState = useNavigationState(state => state);

  const currentRoute = useMemo(() => {
    if (isDefined(navigationState)) {
      return navigationState.routes[navigationState.routes.length - 1];
    }
  }, [navigationState]);

  return currentRoute;
};
