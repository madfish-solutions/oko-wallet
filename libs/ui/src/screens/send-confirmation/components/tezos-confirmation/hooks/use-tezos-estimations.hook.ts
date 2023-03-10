import { Estimate, ParamsWithKind } from '@taquito/taquito';
import { useEffect, useState, useMemo } from 'react';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountInterface } from 'shared';
import { createReadOnlyTezosToolkit } from 'shelter';

import { NetworkInterface } from '../../../../../interfaces/network.interface';
import { getPublicKeyHash } from '../../../../../store/wallet/wallet.utils';

export interface EstimationInterface extends Pick<Estimate, 'suggestedFeeMutez' | 'gasLimit' | 'storageLimit'> {
  minimalFeePerStorageByteMutez: number;
}

interface UseEstimationsArgs {
  transferParams: ParamsWithKind[];
  sender: AccountInterface;
  network: NetworkInterface;
}

export const useTezosEstimations = ({
  sender,
  transferParams,
  network: { rpcUrl, networkType }
}: UseEstimationsArgs) => {
  const [estimations, setEstimations] = useState<EstimationInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tezosToolkit = createReadOnlyTezosToolkit(rpcUrl, sender);

    const subscription = from(
      tezosToolkit.estimate.batch(
        transferParams.map(param => ({
          ...param,
          source: getPublicKeyHash(sender, networkType)
        }))
      )
    )
      .pipe(
        map(estimates =>
          estimates.map<EstimationInterface>(
            // @ts-ignore
            ({ suggestedFeeMutez, gasLimit, storageLimit, minimalFeePerStorageByteMutez }) => ({
              suggestedFeeMutez,
              gasLimit,
              storageLimit,
              minimalFeePerStorageByteMutez
            })
          )
        ),
        catchError(error => {
          console.log('Error:', error);

          return of([]);
        })
      )
      .subscribe(value => {
        setIsLoading(false);
        setEstimations(value);
      });

    return () => subscription.unsubscribe();
  }, [rpcUrl, sender]);

  return useMemo(() => ({ estimations, isLoading }), [estimations, isLoading]);
};
