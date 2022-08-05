import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BatchOperation } from '@taquito/taquito';
import { useState } from 'react';

export const useTransactionHook = () => {
  const [transactionHash, setTransactionHash] = useState('');
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const successCallback = (transactionResponse: TransactionResponse | BatchOperation) => {
    setTransactionHash(transactionResponse.hash);

    setIsTransactionLoading(false);
  };

  return {
    transactionHash,
    isTransactionLoading,
    setIsTransactionLoading,
    successCallback
  };
};
