import { useMemo } from 'react';

import { EstimationInterface } from './use-tezos-estimations.hook';

export const useTezosFees = (estimationsList: EstimationInterface[]) =>
  useMemo(() => {
    const estimationWasSuccessful = estimationsList.length > 0;
    const withReveal = estimationWasSuccessful && estimationsList.length === 2;

    let fees = {
      fee: 0,
      gasLimit: 0,
      storageLimit: 0
    };
    let revealGasFee = 0;

    if (estimationWasSuccessful) {
      const { suggestedFeeMutez, gasLimit, storageLimit } = estimationsList[withReveal ? 1 : 0];

      fees = {
        fee: suggestedFeeMutez,
        gasLimit,
        storageLimit
      };
    }

    if (withReveal) {
      revealGasFee = withReveal ? estimationsList[0].suggestedFeeMutez : 0;

      fees.fee = fees.fee + revealGasFee;
      fees.storageLimit = fees.storageLimit + estimationsList[0].storageLimit;
    }

    return { ...fees, revealGasFee };
  }, [estimationsList]);
