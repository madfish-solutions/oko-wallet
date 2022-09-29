import Clipboard from '@react-native-clipboard/clipboard';
import { RouteProp, useRoute } from '@react-navigation/core';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, TouchableOpacity } from 'react-native';

import { Column } from '../../components/column/column';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { TextInput } from '../../components/text-input/text-input';
import { Text } from '../../components/text/text';
import { WalletCreationContainer } from '../../components/wallet-creation-container/wallet-creation-container';
import { words } from '../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { getCustomSize } from '../../styles/format-size';

import { styles } from './import-wallet.styles';

const wordsLength: Record<string, string> = [...Array(24).fill('')].reduce(
  (acc, item, index) => ({ ...acc, [(index + 1).toString()]: item }),
  {}
);

export const ImportWallet: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.CreateANewWallet>>();
  const { navigate } = useNavigation();

  const wordsState = routeParams?.wordsAmount ?? words[0];

  const generateMnemonic = () => Object.keys(wordsLength).slice(0, wordsState.value) as string[];

  const [mnemonic, setMnemonic] = useState<string[]>(generateMnemonic());
  const [wordsAmount, setWordsAmount] = useState(wordsState);

  const {
    control,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    formState: { errors, dirtyFields }
  } = useForm({
    mode: 'onChange',
    defaultValues: wordsLength
  });

  const fieldsState = watch();

  useEffect(() => {
    const fields = Object.keys(fieldsState)
      .reduce((acc: string[], key) => [...acc, dirtyFields.hasOwnProperty(key) ? fieldsState[key] : ''], [])
      .filter(item => isNotEmptyString(item));

    Clipboard.getString().then(value => {
      const pasteFromClipboard = fields.some(word => word.split(value)[1] === '');
      if (pasteFromClipboard) {
        value.split(' ').forEach((word, index) => setValue(`${index + 1}`, word));
      }
    });
  }, [fieldsState, dirtyFields]);

  useEffect(() => {
    if (isDefined(routeParams)) {
      setWordsAmount(routeParams.wordsAmount);
    }
  }, [routeParams]);

  useEffect(() => {
    setMnemonic(generateMnemonic());
    clearErrors();
  }, [wordsState.value]);

  const navigateToWordsAmountSelector = () => navigate(ScreensEnum.WordsAmountSelector, { wordsAmount });

  const onSubmit = (fields: Record<string, string>) => {
    console.log(
      'Success submitted!',
      Object.values(fields)
        .filter(word => isNotEmptyString(word))
        .join(' ')
    );
  };

  const [wordsColumn1, wordsColumn2] = [
    mnemonic.slice(0, Math.round(mnemonic.length / 2)),
    mnemonic.slice(-(mnemonic.length / 2))
  ];

  return (
    <WalletCreationContainer
      title="Import Existing Wallet"
      step={1}
      maxSteps={2}
      onSubmitPress={handleSubmit(onSubmit)}
      isSubmitDisabled={Boolean(Object.keys(errors).length)}
    >
      <Text style={styles.title}>Enter your Mnemonic (Seed Phrase)</Text>

      <Row style={styles.wordsAmount}>
        <Text style={styles.amountWordsText}>Amount Words</Text>

        <Pressable onPress={navigateToWordsAmountSelector}>
          <Row style={styles.wordsSelector}>
            <Text style={styles.amountWords}>{wordsAmount.value}</Text>
            <Icon name={IconNameEnum.ArrowDropdown} size={getCustomSize(1.25)} />
          </Row>
        </Pressable>
      </Row>

      <Column style={styles.mnemonicContainer}>
        <Row style={styles.wordsWrapper}>
          <Column style={[styles.wordsColumn, styles.marginRight]}>
            {wordsColumn1.map((word, index) => (
              <Controller
                key={`${word}_${index}`}
                control={control}
                name={`${index + 1}`}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextInput
                    field={field}
                    value={word}
                    // @ts-ignore
                    error={errors[index + 1]?.message}
                    inputContainerStyle={[
                      styles.inputContainer,
                      { paddingLeft: index + 1 < 10 ? getCustomSize(3.75) : getCustomSize(4.75) }
                    ]}
                    inputStyle={styles.mnemonicInput}
                  >
                    <Text selectable={false} style={styles.wordIndex}>{`${index + 1}.`}</Text>
                  </TextInput>
                )}
              />
            ))}
          </Column>
          <Column style={styles.wordsColumn}>
            {wordsColumn2.map((word, index) => {
              const countIndex = Math.round(index + 1 + mnemonic.length / 2);

              return (
                <Controller
                  key={`${word}_${index}`}
                  control={control}
                  name={countIndex.toString()}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextInput
                      field={field}
                      value={word}
                      // @ts-ignore
                      error={errors[countIndex]?.message}
                      inputContainerStyle={[
                        styles.inputContainer,
                        { paddingLeft: countIndex < 10 ? getCustomSize(3.75) : getCustomSize(4.75) }
                      ]}
                      inputStyle={styles.mnemonicInput}
                    >
                      <Text selectable={false} style={styles.wordIndex}>
                        {`${countIndex}.`}
                      </Text>
                    </TextInput>
                  )}
                />
              );
            })}
          </Column>
        </Row>

        <Row style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Icon name={IconNameEnum.Paste} iconStyle={styles.buttonIcon} />
            <Text style={styles.buttonText}>Paste</Text>
          </TouchableOpacity>
        </Row>
      </Column>
    </WalletCreationContainer>
  );
};
