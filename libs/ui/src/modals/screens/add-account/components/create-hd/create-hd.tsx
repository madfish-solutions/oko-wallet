import React, { FC } from 'react';
import { Controller } from 'react-hook-form';

import { Column } from '../../../../../components/column/column';
import { TextInput } from '../../../../../components/text-input/text-input';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../../hooks/use-shelter.hook';
import { ModalFooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons';
import { useAccountNameControl } from '../../hooks/use-account-name-control.hook';

import { styles } from './create-hd.styles';

export const CreateHD: FC = () => {
  const { createHdAccount } = useShelter();
  const { goBack } = useNavigation();
  const { control, nameRules, defaultValue, handleSubmit, errors, isSubmitSuccessful } = useAccountNameControl();

  const onSubmit = ({ name }: { name: string }) =>
    createHdAccount(name.trim().length ? name.trim() : defaultValue, goBack);

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
      />
    </Column>
  );
};
