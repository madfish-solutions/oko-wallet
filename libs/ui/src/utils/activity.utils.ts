import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { ActivityResponse, TransactionResponse } from 'backend-types';

import { TransactionLabelEnum, TransactionTypeEnum } from '../interfaces/activity.enum';

export const getTokenSymbol = (userTokensMetadata: ActivityResponse['token_dict'], address: string) =>
  userTokensMetadata[address].optimized_symbol ?? userTokensMetadata[address].name;

export const getTransactionProjectName = (
  userProjectsMetadata: ActivityResponse['project_dict'],
  transaction: TransactionResponse
) => (isDefined(transaction.project_id) ? userProjectsMetadata[transaction.project_id].name : '');

const isGasTokenSentTransaction = (publicKeyHash: string, transaction: TransactionResponse) =>
  publicKeyHash.toLowerCase() === transaction.tx?.from_addr?.toLowerCase();

export const isGasTokenTransaction = (transaction: TransactionResponse) =>
  !(transaction.sends.length > 0 && transaction.receives.length > 0) &&
  isDefined(transaction.tx) &&
  transaction.tx.value > 0 &&
  transaction.cate_id === null &&
  transaction.token_approve === null;

export const getTransactionType = (transaction: TransactionResponse, isGasToken: boolean, publicKeyHash: string) => {
  const isGasTokenSent = isGasTokenSentTransaction(publicKeyHash, transaction);

  const transactionName = isDefined(transaction.tx) && isNotEmptyString(transaction.tx.name) ? transaction.tx.name : '';

  if (transaction.cate_id === TransactionTypeEnum.Send || (isGasToken && isGasTokenSent)) {
    return {
      type: TransactionTypeEnum.Send,
      label: TransactionLabelEnum.Send
    };
  }
  if (transaction.cate_id === TransactionTypeEnum.Receive || (isGasToken && !isGasTokenSent)) {
    return {
      type: TransactionTypeEnum.Receive,
      label: TransactionLabelEnum.Received
    };
  }

  return {
    type: TransactionTypeEnum.ContractCalls,
    label: transactionName || TransactionLabelEnum.ContractInteraction
  };
};
