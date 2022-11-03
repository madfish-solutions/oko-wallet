import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useAllAccountsSelector } from '../../../../store/wallet/wallet.selectors';
import { useAccountFieldRules } from '../../../hooks/use-validate-account-field.hook';

export const useAccountNameControl = () => {
  const totalAccounts = useAllAccountsSelector().length;
  const defaultValue = `Account ${totalAccounts + 1}`;
  const { nameRules } = useAccountFieldRules();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setFocus,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: defaultValue
    }
  });

  const accountName = watch('name');

  useEffect(() => {
    clearErrors();
  }, [accountName]);

  useEffect(() => {
    setFocus('name');
  }, [errors.name]);

  return {
    defaultValue,
    nameRules,
    control,
    handleSubmit,
    isSubmitSuccessful,
    errors
  };
};
