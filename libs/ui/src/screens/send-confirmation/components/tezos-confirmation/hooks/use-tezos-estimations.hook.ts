import { Estimate } from '@taquito/taquito';
import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';
import { useEffect, useState, useMemo } from 'react';
import { from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { getPublicKeyHash } from '../../../../../store/wallet/wallet.utils';
import { parseTezosTransferParams } from '../../../../../utils/parse-tezos-transfer-params.utils';
import { createReadOnlyTezosToolkit } from '../../../../../utils/tezos-toolkit.utils';
import { ConfirmationProps } from '../../../types';

export interface EstimationInterface extends Pick<Estimate, 'suggestedFeeMutez' | 'gasLimit' | 'storageLimit'> {
  minimalFeePerStorageByteMutez: number;
}

interface UseEstimationsArgs extends ConfirmationProps {
  transferParams: TezosTransferParams;
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
        parseTezosTransferParams(transferParams).map(param => ({
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
        catchError(e => {
          console.log('Error:', e);

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
