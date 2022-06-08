import { FeeData } from '@ethersproject/abstract-provider';
import { useEffect, useMemo, useState } from 'react';
import { from } from 'rxjs';

import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { getDefaultEvmProvider } from '../../../../../utils/get-default-evm-provider.utils';

export const useEvmEstimations = ({ rpcUrl }: NetworkInterface) => {
  const [estimations, setEstimations] = useState<FeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const provider = getDefaultEvmProvider(rpcUrl);

    const subscription = from(provider.getFeeData()).subscribe(value => {
      setIsLoading(false);

      if (!Array.isArray(value)) {
        setEstimations(value);
      }
    });

    return () => subscription.unsubscribe();
  }, [rpcUrl]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
