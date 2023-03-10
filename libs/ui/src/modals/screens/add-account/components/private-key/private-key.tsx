import Clipboard from '@react-native-clipboard/clipboard';
import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { Pressable } from '../../../../../components/pressable/pressable';
import { Text } from '../../../../../components/text/text';
import { TextInput as CustomTextInput } from '../../../../../components/text-input/text-input';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { useCreateImportedAccount } from '../../../../../shelter/hooks/use-create-imported-account.hook';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../../../../../store/wallet/wallet.selectors';
import { handleSetValueToClipboard } from '../../../../../utils/copy-to-clipboard.util';
import { generateHdAccountFromPrivateKey } from '../../../../../utils/generate-hd-account-from-private-key.util';
import { ModalFooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons';
import { useAccountFieldRules } from '../../../../hooks/use-validate-account-field.hook';

import { styles } from './private-key.styles';

interface FormTypes {
  name: string;
  privateKey: string;
}

export const PrivateKey: FC = () => {
  const { goBack } = useNavigation();
  const createImportedAccount = useCreateImportedAccount();
  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();
  const { nameRules, privateKeyRules } = useAccountFieldRules();

  const lastAccountIndex = accounts.length + 1;

  const defaultName = `Account ${lastAccountIndex}`;
  const defaultValues: FormTypes = {
    name: defaultName,
    privateKey: ''
  };

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm<FormTypes>({
    mode: 'onChange',
    defaultValues
  });

  const accountName = watch('name');
  const privateKey = watch('privateKey');

  useEffect(() => {
    if (privateKey.length > 60) {
      handleSetValueToClipboard('');
    }
  }, [privateKey]);

  useEffect(() => {
    clearErrors();
  }, [accountName]);

  useEffect(() => {
    setFocus('name');
  }, [errors.name]);

  const handlePaste = () =>
    Clipboard.getString().then(value => {
      handleSetValueToClipboard('');

      setValue('privateKey', value);
      clearErrors('privateKey');
    });

  const onSubmit = async (formValue: FormTypes) => {
    if (!Object.keys(errors).length) {
      const hdAccount = await generateHdAccountFromPrivateKey(formValue.privateKey, networkType).catch(() => ({
        publicKey: '',
        address: '',
        privateKey: ''
      }));

      if (!isNotEmptyString(hdAccount.address)) {
        return setError('privateKey', { message: 'Wrong type of private key' });
      }

      for (const account of accounts) {
        if (account.networksKeys[networkType]?.publicKey === hdAccount.publicKey) {
          return setError('privateKey', { message: 'This account already imported!' });
        }
      }

      createImportedAccount({
        name: formValue.name.trim().length ? formValue.name.trim() : defaultName,
        hdAccount,
        networkType
      });
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
              placeholder={defaultName}
              error={errors?.name?.message}
              required={false}
              containerStyle={styles.inputNameContainer}
            />
          )}
        />
        <View style={styles.container}>
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
                multiline
                error={errors?.privateKey?.message}
                containerStyle={styles.inputContainer}
                inputInnerContainerStyle={styles.inputInnerContainer}
                inputStyle={styles.textarea}
                clearIconStyles={styles.clearIcon}
              />
            )}
          />
          <Pressable onPress={handlePaste} style={styles.pasteButtonContainer}>
            <Text style={styles.pasteButtonText}>Paste</Text>
          </Pressable>
        </View>
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
