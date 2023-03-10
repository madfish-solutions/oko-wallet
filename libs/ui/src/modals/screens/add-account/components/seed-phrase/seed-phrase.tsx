import { RouteProp, useRoute } from '@react-navigation/native';
import { isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, TextInput } from 'react-native';
import { NetworkTypeEnum } from 'shared';
import { derivationPathByNetworkType, generateHdAccount } from 'shelter';

import { Announcement } from '../../../../../components/announcement/announcement';
import { Column } from '../../../../../components/column/column';
import { Icon } from '../../../../../components/icon/icon';
import { IconNameEnum } from '../../../../../components/icon/icon-name.enum';
import { Paste } from '../../../../../components/paste/paste';
import { Pressable } from '../../../../../components/pressable/pressable';
import { Row } from '../../../../../components/row/row';
import { Text } from '../../../../../components/text/text';
import { TextInput as CustomTextInput } from '../../../../../components/text-input/text-input';
import { ScreensEnum, ScreensParamList } from '../../../../../enums/sreens.enum';
import { useImportSeedPhrase } from '../../../../../hooks/use-import-seed-phrase.hook';
import { useNavigation } from '../../../../../hooks/use-navigation.hook';
import { useCreateImportedAccount } from '../../../../../shelter/hooks/use-create-imported-account.hook';
import { useAllAccountsSelector, useSelectedNetworkTypeSelector } from '../../../../../store/wallet/wallet.selectors';
import { getCustomSize } from '../../../../../styles/format-size';
import { ModalFooterButtons } from '../../../../components/modal-footer-buttons/modal-footer-buttons';
import { useAccountFieldRules } from '../../../../hooks/use-validate-account-field.hook';

import { styles } from './seed-phrase.styles';
import { AddBySeedPhraseTestIDs } from './seed-phrase.test-ids';

export const SeedPhrase: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.AddAccount>>();

  const networkType = useSelectedNetworkTypeSelector();
  const accounts = useAllAccountsSelector();
  const createImportedAccount = useCreateImportedAccount();
  const { goBack } = useNavigation();
  const {
    mnemonic,
    isEmptyFieldsExist,
    error,
    scrollViewRef,
    wordsAmount,
    selectedInputIndex,
    isShowProtectLayout,
    isSubmitted,
    setIsSubmitted,
    checkErrors,
    navigateToWordsAmountSelector,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleShowLayout,
    scrollToOffset,
    handlePasteMnemonicFromClipboard
  } = useImportSeedPhrase(routeParams?.wordsAmount);

  const lastAccountIndex = accounts.length + 1;
  const defaultValue = `Account ${lastAccountIndex}`;
  const { nameRules, derivationPathRules } = useAccountFieldRules();

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: defaultValue,
      derivationPath: derivationPathByNetworkType[networkType](0)
    },
    shouldFocusError: false
  });

  const accountName = watch('name');

  useEffect(() => {
    clearErrors();
  }, [accountName, mnemonic]);

  const onSubmit = async ({ name, derivationPath }: { name: string; derivationPath: string }) => {
    setIsSubmitted(true);

    const isError = checkErrors();

    if (!isError && !Object.keys(errors).length) {
      const hdAccount = await generateHdAccount(
        mnemonic.filter(word => isNotEmptyString(word)).join(' '),
        derivationPath
      );

      for (const account of accounts) {
        if (account.networksKeys[networkType]?.publicKey === hdAccount.publicKey) {
          scrollToOffset();

          return setError('derivationPath', { message: 'This account already imported!' }, { shouldFocus: false });
        }
      }

      createImportedAccount({ name: name.trim().length ? name.trim() : defaultValue, hdAccount, networkType });
    }
  };

  const containerError = useMemo(() => error === 'Wrong combination. Try again.', [error]);

  return (
    <>
      <ScrollView ref={scrollViewRef} style={styles.root}>
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

        <Row style={styles.wordsAmount}>
          <Text style={styles.amountWordsText}>Mnemonic Length</Text>

          <Pressable onPress={navigateToWordsAmountSelector}>
            <Row style={styles.wordsSelector}>
              <Text style={styles.amountWords}>{wordsAmount}</Text>
              <Icon name={IconNameEnum.Dropdown} size={getCustomSize(2)} />
            </Row>
          </Pressable>
        </Row>

        <Column style={[styles.mnemonicContainer, containerError && styles.containerError]}>
          <Row style={styles.wordsWrapper}>
            <Row style={[styles.wordsColumn, styles.marginRight]}>
              {mnemonic.slice(0, wordsAmount).map((word, index) => {
                const value = word;
                const isSelectedInput = index === selectedInputIndex;

                return (
                  <View key={index} style={styles.inputContainer}>
                    <TextInput
                      ref={el => (index === selectedInputIndex ? el?.focus() : null)}
                      value={value}
                      onFocus={el => handleInputFocus(index, el)}
                      onBlur={handleInputBlur}
                      onChangeText={newValue => handleInputChange(newValue, index)}
                      style={[styles.mnemonicInput, isSubmitted && !isNotEmptyString(value) && styles.error]}
                      testID={AddBySeedPhraseTestIDs.SeedPhraseInput}
                    />
                    <Text selectable={false} style={styles.wordIndex}>{`${index + 1}.`}</Text>
                    {isNotEmptyString(value) && isShowProtectLayout && !isSelectedInput && (
                      <Pressable onPress={() => handleShowLayout(index)} style={styles.layout}>
                        <Text style={styles.layoutText}>Tap to reveal</Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </Row>
          </Row>

          <Row style={styles.mnemonicButtons}>
            <Paste handlePaste={handlePasteMnemonicFromClipboard} />
          </Row>

          {isNotEmptyString(error) && <Text style={styles.errorText}>{error}</Text>}
        </Column>

        <Controller
          control={control}
          name="derivationPath"
          rules={derivationPathRules}
          render={({ field }) => (
            <CustomTextInput
              field={field}
              label="Derivation Path"
              prompt="Enter your Derivation Path"
              placeholder={networkType === NetworkTypeEnum.EVM ? "m/44'/60'/0'/0/0" : "m/44'/1729'/0'/0'"}
              error={errors?.derivationPath?.message}
              containerStyle={styles.inputDerivationPathContainer}
            />
          )}
        />

        <Announcement>
          <Column style={styles.warningList}>
            <Row style={styles.listItem}>
              <Text style={styles.listDote}>●</Text>
              <Text numberOfLines={2} style={styles.listText}>
                We don't save your derivation path and Mnemonic
              </Text>
            </Row>
            <Row style={styles.listItem}>
              <Text style={styles.listDote}>●</Text>
              <Text numberOfLines={2} style={styles.listText}>
                Only one account will be imported
              </Text>
            </Row>
          </Column>
        </Announcement>
      </ScrollView>

      <ModalFooterButtons
        submitTitle="Import"
        onCancelPress={goBack}
        onSubmitPress={handleSubmit(onSubmit)}
        isSubmitDisabled={Boolean(Object.keys(errors).length) || (isSubmitSuccessful && isEmptyFieldsExist) || !!error}
        style={styles.buttons}
        testID={AddBySeedPhraseTestIDs.ImportButton}
      />
    </>
  );
};
