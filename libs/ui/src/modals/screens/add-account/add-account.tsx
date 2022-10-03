import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { TextInput } from '../../../components/text-input/text-input';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { useShelter } from '../../../hooks/use-shelter.hook';
import { useAllAccountsSelector } from '../../../store/wallet/wallet.selectors';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';
import { useAccountFieldRules } from '../../hooks/use-validate-account-field.hook';

import { styles } from './add-account.styles';

export const AddAccount: FC = () => {
  const totalAccounts = useAllAccountsSelector().length;
  const defaultValue = `Account ${totalAccounts + 1}`;
  const { createHdAccount } = useShelter();
  const { goBack } = useNavigation();
  const rules = useAccountFieldRules();

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

  const onSubmit = ({ name }: { name: string }) => createHdAccount(name.trim(), goBack);

  return (
    <ModalActionContainer
      screenTitle="Add new account"
      submitTitle="Create"
      onCancelPress={goBack}
      onSubmitPress={handleSubmit(onSubmit)}
      isSubmitDisabled={Boolean(Object.keys(errors).length) || isSubmitSuccessful}
    >
      <Controller
        control={control}
        name="name"
        rules={rules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Account name"
            placeholder={defaultValue}
            error={errors?.name?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />
    </ModalActionContainer>
  );
};
