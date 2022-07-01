import { ParamsWithKind, OpKind } from '@taquito/taquito';
import { useMemo } from 'react';

import { EstimationInterface } from './use-tezos-estimations.hook';

export const useTezosFees = (transferParams: ParamsWithKind[], estimationsList: EstimationInterface[]) =>
  useMemo(() => {
    const estimationWasSuccessful = estimationsList.length > 0;
    const isOneOperation = transferParams.length === 1;
    let basicFees = {
      gasFeeSum: 0,
      storageLimitSum: 0
    };
    let revealGasFee = 0;

    if (!estimationWasSuccessful) {
      return { ...basicFees, revealGasFee, isOneOperation, transferParamsWithFees: [] };
    }

    const withReveal = estimationsList.length === transferParams.length + 1;

    const transferParamsWithFees = transferParams.map((transferParam, i) => {
      const estimation = estimationsList[withReveal ? i + 1 : i];
      const {
        fee = estimation.suggestedFeeMutez,
        gasLimit = estimation.gasLimit,
        storageLimit = estimation.storageLimit
      } = transferParam.kind !== OpKind.ACTIVATION ? transferParam : {};

      return { ...transferParam, fee, gasLimit, storageLimit };
    });

    basicFees = transferParamsWithFees.reduce(
      (total, transferParam) => {
        const { fee = 0, storageLimit = 0 } = transferParam.kind !== OpKind.ACTIVATION ? transferParam : {};

        return {
          gasFeeSum: total.gasFeeSum + fee,
          storageLimitSum: total.storageLimitSum + storageLimit
        };
      },
      {
        gasFeeSum: 0,
        storageLimitSum: 0
      }
    );

    if (withReveal) {
      revealGasFee = estimationsList[0].suggestedFeeMutez;

      basicFees.gasFeeSum = basicFees.gasFeeSum + revealGasFee;
      basicFees.storageLimitSum = basicFees.storageLimitSum + estimationsList[0].storageLimit;
    }

    return { ...basicFees, revealGasFee, transferParamsWithFees, isOneOperation };
  }, [estimationsList]);
