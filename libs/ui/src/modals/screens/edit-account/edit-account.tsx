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
import { colors } from '../../../styles/colors';
import { ModalContainer } from '../../components/modal-container/modal-container';
import { useAccountFieldRules } from '../../hooks/use-validate-account-field.hook';

import { styles } from './edit-account.styles';

export const EditAccount: FC = () => {
  const {
    params: { account }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.EditAccount>>();
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const rules = useAccountFieldRules(account);

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
    <ModalContainer screenTitle="Edit Account" isBackButton>
      <View style={styles.root}>
        <View style={styles.content}>
          <Controller
            control={control}
            name="name"
            rules={rules}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextInput
                ref={ref}
                label="Account name"
                placeholderTextColor={colors.border1}
                placeholder={account.name}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                inputStyle={styles.input}
                error={errors?.name?.message}
              />
            )}
          />
        </View>

        <Row>
          <Button style={styles.cancelButton} theme="secondary" size="large" title="Cancel" onPress={goBack} />
          <Button
            disabled={Boolean(Object.keys(errors).length)}
            theme="tertiary"
            size="large"
            title="Save"
            onPress={handleSubmit(onSubmit)}
          />
        </Row>
      </View>
    </ModalContainer>
  );
};
