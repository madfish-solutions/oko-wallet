import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { Button } from '../../components/button/button';
import { Row } from '../../components/row/row';
import { TextInput } from '../../components/text-input/text-input';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { editAccountNameAction } from '../../store/wallet/wallet.actions';
import { useAllAccountsNameSelector } from '../../store/wallet/wallet.selectors';
import { colors } from '../../styles/colors';
import { Modal } from '../modal/modal';

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
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: account.name
    }
  });

  const checkIfAccountNameUnique = (currentValue: string) => {
    if (account.name === currentValue || !allAccountsName.includes(currentValue)) {
      return true;
    }

    return 'Should be unique';
  };

  const onSubmit = ({ name }: { name: string }) => {
    if (account.name !== name) {
      dispatch(editAccountNameAction({ accountIndex: account.accountIndex, name }));
    }

    goBack();
  };

  return (
    <Modal screenTitle="Edit Account" isBackButton>
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
                validate: checkIfAccountNameUnique
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
    </Modal>
  );
};
