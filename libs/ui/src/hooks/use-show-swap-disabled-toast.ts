import { useCallback } from 'react';

import { modernCivilizationDidNotReachThisNetwork } from '../components/toast/constants/toast-messages';

import { useToast } from './use-toast.hook';

export const useShowSwapDisabledToast = () => {
  const { showInfoToast } = useToast();

  return useCallback(
    () =>
      showInfoToast({
        message: 'Oops!',
        data: {
          description: modernCivilizationDidNotReachThisNetwork
        }
      }),
    []
  );
};
