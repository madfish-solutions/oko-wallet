import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';

import { Announcement } from '../../../../../components/announcement/announcement';
import { TextInput as CustomTextInput } from '../../../../../components/text-input/text-input';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { useShelter } from '../../../../../hooks/use-shelter.hook';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../../../../../store/wallet/wallet.selectors';
import { generateHdAccountFromPrivateKey } from '../../../../../utils/generate-hd-account-from-private-key.util';
import { ModalFooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons';
import { useAccountFieldRules } from '../../../../hooks/use-validate-account-field.hook';

import { styles } from './private-key.styles';

export const PrivateKey: FC = () => {
  const { goBack } = useNavigation();
  const { createImportedAccount } = useShelter();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();
  const { nameRules, privateKeyRules } = useAccountFieldRules();

  const lastAccountIndex = accounts.length + 1;
  const defaultValue = `Account ${lastAccountIndex}`;

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    setFocus,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: defaultValue,
      privateKey: ''
    }
  });

  const accountName = watch('name');

  useEffect(() => {
    clearErrors();
  }, [accountName]);

  useEffect(() => {
    setFocus('name');
  }, [errors.name]);

  const onSubmit = async ({ name, privateKey }: { name: string; privateKey: string }) => {
    if (!Object.keys(errors).length) {
      const hdAccount = await generateHdAccountFromPrivateKey(privateKey, networkType);

      for (const account of accounts) {
        if (account.networksKeys[networkType]?.publicKey === hdAccount.publicKey) {
          return setError('privateKey', { message: 'This account already imported!' });
        }
      }

      createImportedAccount({ name: name.trim().length ? name.trim() : defaultValue, hdAccount, networkType });
    }
  };

  return (
    <>
      <ScrollView style={styles.root}>
        <Controller
          control={control}
          name="name"
          rules={nameRules}
          render={({ field }) => (
            <CustomTextInput
              field={field}
              label="Account name"
              placeholder={defaultValue}
              error={errors?.name?.message}
              required={false}
              containerStyle={styles.inputNameContainer}
            />
          )}
        />
        <Controller
          control={control}
          name="privateKey"
          rules={privateKeyRules}
          render={({ field }) => (
            <CustomTextInput
              field={field}
              label="Private Key"
              prompt="Enter your Private Key"
              placeholder="e.g. b782aa.."
              error={errors?.privateKey?.message}
              containerStyle={styles.inputNameContainer}
            />
          )}
        />
        <Announcement text={`The account will only be active for the current network type: ${networkType}`} />
      </ScrollView>
      <ModalFooterButtons
        submitTitle="Import"
        onCancelPress={goBack}
        onSubmitPress={handleSubmit(onSubmit)}
        isSubmitDisabled={Boolean(Object.keys(errors).length)}
        style={styles.buttons}
      />
    </>
  );
};
