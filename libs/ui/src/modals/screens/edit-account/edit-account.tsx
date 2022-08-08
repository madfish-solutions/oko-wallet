import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { TextInput } from '../../../components/text-input/text-input';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { editAccountNameAction } from '../../../store/wallet/wallet.actions';
import { ModalActionContainer } from '../../components/modal-action-container/modal-action-container';
import { useAccountFieldRules } from '../../hooks/use-validate-account-field.hook';

export const EditAccount: FC = () => {
  const {
    params: { account }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditAccount>>();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const rules = useAccountFieldRules(account.name);

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setFocus,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
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

    if (account.name !== editedName) {
      dispatch(editAccountNameAction({ accountIndex: account.accountIndex, name: editedName }));
    }

    goBack();
  };

  return (
    <ModalActionContainer
      screenTitle="Edit Account"
      submitTitle="Save"
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
      onSubmitPress={handleSubmit(onSubmit)}
      onCancelPress={goBack}
    >
      <View>
        <Controller
          control={control}
          name="name"
          rules={rules}
          render={({ field }) => (
            <TextInput field={field} label="Account name" placeholder={account.name} error={errors?.name?.message} />
          )}
        />
      </View>
    </ModalActionContainer>
  );
};
