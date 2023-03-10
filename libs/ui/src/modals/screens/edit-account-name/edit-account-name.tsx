import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { TextInput } from '../../../components/text-input/text-input';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { editAccountNameAction } from '../../../store/wallet/wallet.actions';
import { ModalActionsContainer } from '../../components/modal-actions-container/modal-actions-container';
import { useAccountFieldRules } from '../../hooks/use-validate-account-field.hook';

import { styles } from './edit-account-name.styles';

export const EditAccountName: FC = () => {
  const {
    params: { account }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditAccountName>>();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { nameRules } = useAccountFieldRules();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setFocus,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: account.name
    }
  });

  const accountName = watch('name');

  useEffect(() => {
    clearErrors();
  }, [accountName]);

  useEffect(() => {
    setFocus('name');
  }, [errors.name]);

  const onSubmit = ({ name }: { name: string }) => {
    const editedName = name.trim();

    if (account.name !== editedName && editedName !== '') {
      dispatch(editAccountNameAction({ accountId: account.accountId, name: editedName }));
    }

    goBack();
  };

  return (
    <ModalActionsContainer
      screenTitle="Edit Account"
      submitTitle="Save"
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
      onSubmitPress={handleSubmit(onSubmit)}
      onCancelPress={goBack}
    >
      <Controller
        control={control}
        name="name"
        rules={nameRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Account name"
            placeholder={account.name}
            error={errors?.name?.message}
            containerStyle={styles.inputContainer}
          />
        )}
      />
    </ModalActionsContainer>
  );
};
