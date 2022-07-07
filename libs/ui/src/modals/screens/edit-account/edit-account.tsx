import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../../components/button/button';
import { Row } from '../../../components/row/row';
import { TextInput } from '../../../components/text-input/text-input';
import { ScreensEnum, ScreensParamList } from '../../../enums/sreens.enum';
import { useNavigation } from '../../../hooks/use-navigation.hook';
import { editAccountNameAction } from '../../../store/wallet/wallet.actions';
import { useAllAccountsNameSelector } from '../../../store/wallet/wallet.selectors';
import { colors } from '../../../styles/colors';
import { ModalContainer } from '../../components/modal-container/modal-container';

import { styles } from './edit-account.styles';

export const EditAccount: FC = () => {
  const allAccountsName = useAllAccountsNameSelector();
  const {
    params: { account }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditAccount>>();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
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

  const checkIfAccountNameUnique = (currentValue: string) => {
    const correctedCurrentValue = currentValue.trim();

    if (account.name === correctedCurrentValue || !allAccountsName.includes(correctedCurrentValue)) {
      return true;
    }

    return 'Should be unique';
  };

  const checkIfOnlySpaces = (currentValue: string) => {
    if (currentValue.length && !currentValue.trim()) {
      return 'Can not save only spaces';
    }
  };

  const onSubmit = ({ name }: { name: string }) => {
    const correctedName = name.trim();

    if (account.name !== correctedName) {
      dispatch(editAccountNameAction({ accountIndex: account.accountIndex, name: correctedName }));
    }

    goBack();
  };

  return (
    <ModalContainer screenTitle="Edit Account" isBackButton>
      <>
        <View style={styles.root}>
          <View style={styles.content}>
            <Controller
              control={control}
              rules={{
                maxLength: {
                  value: 21,
                  message: 'Maximum 21 symbol'
                },
                required: 'This is required',
                validate: { checkIfAccountNameUnique, checkIfOnlySpaces }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Account name"
                  placeholderTextColor={colors.border1}
                  placeholder={account.name}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors?.name?.message}
                />
              )}
              name="name"
            />
          </View>

          <Row>
            <Button style={styles.cancelButton} theme="dark" title="Cancel" onPress={goBack} />
            <Button
              disabled={Boolean(Object.keys(errors).length)}
              theme="orange"
              title="Save"
              onPress={handleSubmit(onSubmit)}
            />
          </Row>
        </View>
      </>
    </ModalContainer>
  );
};
