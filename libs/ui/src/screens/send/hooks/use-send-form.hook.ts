import { isDefined } from '@rnw-community/shared';
import { useEffect, useCallback } from 'react';
import { UseFormSetValue, UseFormTrigger, UseFormClearErrors } from 'react-hook-form/dist/types/form';
import { useDispatch } from 'react-redux';
import { AccountInterface } from 'shared';

import { useToast } from '../../../hooks/use-toast.hook';
import { Token } from '../../../interfaces/token.interface';
import { sendAssetAction } from '../../../store/wallet/wallet.actions';
import {
  useAllAccountsWithoutSelectedSelector,
  useGasTokenSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkTypeSelector
} from '../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../store/wallet/wallet.utils';
import { FormTypes, SendParams } from '../types';

interface UseSendArgs {
  params?: SendParams;
  account?: AccountInterface;
  setValue: UseFormSetValue<FormTypes>;
  trigger: UseFormTrigger<FormTypes>;
  clearErrors: UseFormClearErrors<FormTypes>;
  token?: Token;
}

export const useSendForm = ({ params, account, setValue, trigger, clearErrors, token }: UseSendArgs) => {
  const { showErrorToast } = useToast();
  const dispatch = useDispatch();
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();
  const gasToken = useGasTokenSelector();

  useEffect(() => {
    if (isDefined(params) && isDefined(params.account)) {
      setValue('account', params.account);
    }

    if (isDefined(params) && isDefined(params.token)) {
      setValue('token', params.token);
    }

    if (isDefined(params) && isDefined(params.receiverPublicKeyHash)) {
      setValue('receiverPublicKeyHash', params.receiverPublicKeyHash);
      trigger('receiverPublicKeyHash');
    }
  }, [params]);

  useEffect(() => {
    if (isDefined(account) && publicKeyHash === getPublicKeyHash(account, networkType)) {
      setValue('account', allAccountsWithoutSelected[0]);
    }
  }, [publicKeyHash, account, allAccountsWithoutSelected]);

  useEffect(() => clearErrors(), [token]);

  return useCallback(
    (formValue: FormTypes) => {
      const isGasTokenZeroBalance = Number(gasToken.balance.data) === 0;

      if (isGasTokenZeroBalance) {
        return showErrorToast({ message: 'Not enough gas' });
      }

      if (isDefined(formValue.token)) {
        dispatch(
          sendAssetAction.submit({
            token: formValue.token,
            amount: formValue.amount,
            receiverPublicKeyHash:
              formValue.isTransferBetweenAccounts && formValue.account
                ? getPublicKeyHash(formValue.account, networkType)
                : formValue.receiverPublicKeyHash
          })
        );
      }
    },
    [gasToken]
  );
};
