import { isDefined } from '@rnw-community/shared';
import { useEffect } from 'react';
import { UseFormSetValue, UseFormTrigger, UseFormClearErrors } from 'react-hook-form/dist/types/form';
import { AccountInterface } from 'shared/interfaces/account.interface';

import { Token } from '../../../interfaces/token.interface';
import {
  useAllAccountsWithoutSelectedSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkTypeSelector
} from '../../../store/wallet/wallet.selectors';
import { getPublicKeyHash } from '../../../store/wallet/wallet.utils';
import { SendParams, FormTypes } from '../types';

interface UseSendArgs {
  params?: SendParams;
  account?: AccountInterface;
  setValue: UseFormSetValue<FormTypes>;
  trigger: UseFormTrigger<FormTypes>;
  clearErrors: UseFormClearErrors<FormTypes>;
  token?: Token;
}

export const useSendForm = ({ params, account, setValue, trigger, clearErrors, token }: UseSendArgs) => {
  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();

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
};
