import { isDefined } from '@rnw-community/shared';
import { useEffect, useRef, useState, useCallback } from 'react';
import { UseFormSetValue, UseFormTrigger, UseFormClearErrors } from 'react-hook-form/dist/types/form';

import { ScreensEnum } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { AccountInterface } from '../../../interfaces/account.interface';
import { Token } from '../../../interfaces/token.interface';
import {
  useAllAccountsWithoutSelectedSelector,
  useSelectedAccountPublicKeyHashSelector,
  useSelectedNetworkSelector,
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
  const network = useSelectedNetworkSelector();
  const networkType = useSelectedNetworkTypeSelector();
  const allAccountsWithoutSelected = useAllAccountsWithoutSelectedSelector();
  const [isAccountOrNetworkChanged, setIsAccountOrNetworkChanged] = useState(false);
  const { goBack, navigate } = useNavigation();

  const initialPublicKeyHash = useRef(publicKeyHash);
  const initialNetwork = useRef(network);

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

  useEffect(() => {
    if (
      publicKeyHash !== initialPublicKeyHash.current ||
      network.rpcUrl !== initialNetwork.current.rpcUrl ||
      network.chainId !== initialNetwork.current.chainId
    ) {
      setValue('token', undefined);
      setValue('amount', '');
      setValue('receiverPublicKeyHash', '');
      clearErrors();

      initialNetwork.current = network;
      initialPublicKeyHash.current = publicKeyHash;

      setIsAccountOrNetworkChanged(true);
    }
  }, [publicKeyHash, network.rpcUrl, network.chainId]);

  useEffect(() => clearErrors(), [token]);

  const onBackButtonPress = useCallback(
    () => (isAccountOrNetworkChanged ? navigate(ScreensEnum.Wallet) : goBack()),
    [isAccountOrNetworkChanged]
  );

  return { onBackButtonPress };
};
