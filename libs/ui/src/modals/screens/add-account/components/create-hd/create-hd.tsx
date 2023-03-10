import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Column } from '../../../../../components/column/column';
import { TextInput } from '../../../../../components/text-input/text-input';
import { ScreensEnum } from '../../../../../enums/sreens.enum';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { useCreateHdAccount } from '../../../../../shelter/hooks/use-create-hd-account.hook';
import { ModalFooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons';
import { useAccountNameControl } from '../../hooks/use-account-name-control.hook';

import { styles } from './create-hd.styles';
import { AddHdAccountTestIDs } from './create-hd.test-ids';

export const CreateHD: FC = () => {
  const createHdAccount = useCreateHdAccount();
  const { navigate, goBack } = useNavigation();
  const { control, nameRules, defaultValue, handleSubmit, errors, isSubmitSuccessful } = useAccountNameControl();

  const onSubmit = ({ name }: { name: string }) =>
    createHdAccount(name.trim().length ? name.trim() : defaultValue, () => navigate(ScreensEnum.Wallet));

  return (
    <Column style={styles.root}>
      <Controller
        control={control}
        name="name"
        rules={nameRules}
        render={({ field }) => (
          <TextInput
            field={field}
            label="Account name"
            placeholder={defaultValue}
            error={errors?.name?.message}
            required={false}
            containerStyle={styles.inputContainer}
          />
        )}
      />
      <ModalFooterButtons
        submitTitle="Create"
        onCancelPress={goBack}
        onSubmitPress={handleSubmit(onSubmit)}
        isSubmitDisabled={Boolean(Object.keys(errors).length) || isSubmitSuccessful}
        style={styles.buttons}
        testID={AddHdAccountTestIDs.CreateButton}
      />
    </Column>
  );
};
