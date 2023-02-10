import { TransactionRequest } from '@ethersproject/abstract-provider';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeApproveAllowanceDataAction } from '../../../../../store/swap/swap.actions';
import { useApproveAllowanceDataSelector } from '../../../../../store/swap/swap.selectors';

export const useModifyEvmTransactionParams = (initialTransactionParams: TransactionRequest) => {
  const dispatch = useDispatch();
  const approveAllowanceData = useApproveAllowanceDataSelector();

  const [transactionParams, setTransactionParams] = useState(() => ({
    ...initialTransactionParams,
    ...(isDefined(initialTransactionParams.value) && {
      value: BigNumber.from(initialTransactionParams.value).toHexString()
    })
  }));

  useEffect(() => {
    if (isNotEmptyString(approveAllowanceData)) {
      setTransactionParams({ ...transactionParams, data: approveAllowanceData });

      dispatch(changeApproveAllowanceDataAction(''));
    }
  }, [approveAllowanceData]);

  return transactionParams;
};
