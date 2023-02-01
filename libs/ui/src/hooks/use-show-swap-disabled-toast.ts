import { useCallback } from 'react';

import { useToast } from './use-toast.hook';

export const useShowSwapDisabledToast = () => {
  const { showInfoToast } = useToast();

  return useCallback(
    () =>
      showInfoToast({
        message: 'Oops!',
        data: {
          description:
            'Modern civilization didn’t reach this network, and the feature isn’t available here. We are on the way to colonize it!'
        }
      }),
    []
  );
};
