import { TransferParams as TezosTransferParams } from '@taquito/taquito/dist/types/operations/types';
import { useMemo } from 'react';

import { EstimationInterface } from './use-tezos-estimations.hook';

export const useTezosFees = (transferParams: TezosTransferParams[], estimationsList: EstimationInterface[]) =>
  useMemo(() => {
    const estimationWasSuccessful = estimationsList.length > 0;

    let fees = {
      fee: 0,
      gasLimit: 0,
      storageLimit: 0
    };
    let revealGasFee = 0;

    if (!estimationWasSuccessful) {
      return { ...fees, revealGasFee };
    }

    const { suggestedFeeMutez, gasLimit, storageLimit } = estimationsList[0];
    const withReveal = estimationsList.length === transferParams.length + 1;

    fees = {
      fee: suggestedFeeMutez,
      gasLimit,
      storageLimit
    };

    if (withReveal) {
      revealGasFee = estimationsList[1].suggestedFeeMutez;

      fees.fee = fees.fee + revealGasFee;
      fees.storageLimit = fees.storageLimit + estimationsList[1].storageLimit;
      fees.gasLimit = estimationsList[1].gasLimit;
    }

    return { ...fees, revealGasFee };
  }, [estimationsList]);
