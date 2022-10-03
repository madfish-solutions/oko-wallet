import Clipboard from '@react-native-clipboard/clipboard';
import { useRoute } from '@react-navigation/core';
import { RouteProp } from '@react-navigation/native';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { validateMnemonic } from 'bip39';
import React, { FC, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputFocusEventData,
  TouchableOpacity,
  View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Column } from '../../components/column/column';
import { Icon } from '../../components/icon/icon';
import { IconNameEnum } from '../../components/icon/icon-name.enum';
import { Row } from '../../components/row/row';
import { Text } from '../../components/text/text';
import { WalletCreationContainer } from '../../components/wallet-creation-container/wallet-creation-container';
import { SECURITY_TIME } from '../../constants/defaults';
import { words } from '../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { getCustomSize } from '../../styles/format-size';
import { formatMnemonic } from '../../utils/format-mnemonic.util';

import { styles } from './import-wallet.styles';

const maxWordsLength = Array(24).fill('');

export const ImportWallet: FC = () => {
  const { params: routeParams } = useRoute<RouteProp<ScreensParamList, ScreensEnum.CreateANewWallet>>();
  const { navigate } = useNavigation();

  const wordsAmountState = routeParams?.wordsAmount ?? words[0];

  const [wordsAmount, setWordsAmount] = useState(wordsAmountState.value);
  const [mnemonic, setMnemonic] = useState<string[]>(maxWordsLength);
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const focusInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isShowProtectLayout) {
      timeout = setTimeout(() => {
        focusInputRef.current?.blur();
        setIsShowProtectLayout(true);
      }, SECURITY_TIME);
    }

    return () => clearTimeout(timeout);
  }, [isShowProtectLayout, mnemonic, focusInputRef]);

  useEffect(() => {
    setError('');
  }, [mnemonic]);

  useEffect(() => {
    if (isDefined(routeParams)) {
      setWordsAmount(routeParams.wordsAmount.value);
    }
  }, [routeParams]);

  useEffect(() => {
    if (isDefined(routeParams)) {
      setMnemonic(prev =>
        prev.map((emptyField, index) => {
          if (isDefined(mnemonic[index])) {
            return mnemonic[index];
          }

          return emptyField;
        })
      );
    }
  }, [routeParams]);

  const predictMnemonicLength = (mnemonicLength: number) => {
    const allMnemonicValues = [12, 15, 18, 21, 24];

    const isCurrentLengthExist = allMnemonicValues.includes(mnemonicLength);

    if (isCurrentLengthExist) {
      return mnemonicLength;
    }

    let finalValue = allMnemonicValues[0];
    let i = 0;

    while (i < allMnemonicValues.length) {
      if (allMnemonicValues[i] > mnemonicLength) {
        return (finalValue = allMnemonicValues[i]);
      }
      i++;
    }

    return finalValue;
  };

  const handlePasteMnemonicFormClipboard = useCallback((value: string) => {
    const clipboardMnemonic = value.trim().split(' ');
    const calculatedLength = predictMnemonicLength(clipboardMnemonic.length);
    const filledMnemonic = maxWordsLength.map((emptyString, index) => clipboardMnemonic[index] ?? emptyString);

    setWordsAmount(calculatedLength);
    setSelectedInputIndex(null);
    setMnemonic(filledMnemonic);
  }, []);

  const handleInputChange = useCallback(
    (value: string, index: number) => {
      Clipboard.getString().then(clipboardValue => {
        if (value.includes(clipboardValue) && isNotEmptyString(clipboardValue) && isDefined(clipboardValue)) {
          handlePasteMnemonicFormClipboard(clipboardValue);
        } else {
          const newMnemonic = mnemonic.slice();
          newMnemonic[index] = value;

          setMnemonic(newMnemonic);
        }
      });
    },
    [handlePasteMnemonicFormClipboard, mnemonic]
  );

  const handlePaste = useCallback(() => {
    Clipboard.getString().then(clipboardValue => {
      if (isNotEmptyString(clipboardValue) && isDefined(clipboardValue)) {
        handlePasteMnemonicFormClipboard(clipboardValue);
      }
    });
  }, [handlePasteMnemonicFormClipboard]);

  const navigateToWordsAmountSelector = () =>
    navigate(ScreensEnum.WordsAmountSelector, {
      wordsAmount: words.find(({ value }) => value === wordsAmount) ?? words[0]
    });

  const handleShowLayout = (index: number) => {
    setIsShowProtectLayout(false);
    setSelectedInputIndex(index);
  };

  const handleInputFocus = (index: number, el: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setSelectedInputIndex(index);
    // @ts-ignore
    focusInputRef.current = el.target;
  };

  const handleInputBlur = () => {
    setIsShowProtectLayout(true);
    setSelectedInputIndex(null);
  };

  const isEmptyFieldsExist = useMemo(
    () => mnemonic.slice(0, wordsAmount).some(field => !isNotEmptyString(field)),
    [mnemonic]
  );

  useEffect(() => {
    if (isNotEmptyString(error)) {
      setTimeout(() => {
        if (scrollViewRef?.current !== null) {
          scrollViewRef.current.scrollTo({ y: 500 });
        }
      }, 0);
    }
  }, [error]);

  const navigateToAlmostDoneScreen = () => {
    setIsSubmitted(true);

    if (isEmptyFieldsExist) {
      return setError('Please, enter all the words.');
    } else if (!validateMnemonic(formatMnemonic(mnemonic.join(' ')))) {
      return setError('Wrong mnemonic type of words.');
    }

    navigate(ScreensEnum.AlmostDone, { mnemonic: mnemonic.join(' '), step: 2, maxStep: 2 });
  };

  const [wordsColumn1, wordsColumn2] = [
    [...Array(Math.ceil(wordsAmount / 2)).keys()],
    [...Array(Math.floor(wordsAmount / 2)).keys()]
  ];

  return (
    <WalletCreationContainer
      title="Import Existing Wallet"
      step={1}
      maxSteps={2}
      onSubmitPress={navigateToAlmostDoneScreen}
      isSubmitDisabled={(isEmptyFieldsExist && isSubmitted) || !!error}
      scrollViewRef={scrollViewRef}
    >
      <Row style={styles.wordsAmount}>
        <Text style={styles.amountWordsText}>Mnemonic Length</Text>

        <Pressable onPress={navigateToWordsAmountSelector}>
          <Row style={styles.wordsSelector}>
            <Text style={styles.amountWords}>{wordsAmount}</Text>
            <Icon name={IconNameEnum.ArrowDropdown} size={getCustomSize(1.25)} />
          </Row>
        </Pressable>
      </Row>

      <Column style={styles.mnemonicContainer}>
        <Row style={styles.wordsWrapper}>
          <Column style={[styles.wordsColumn, styles.marginRight]}>
            {wordsColumn1.map((_, index) => (
              <View key={index} style={styles.inputContainer}>
                <TextInput
                  ref={el => (index === selectedInputIndex ? el?.focus() : null)}
                  value={mnemonic[index]}
                  onFocus={el => handleInputFocus(index, el)}
                  onBlur={handleInputBlur}
                  onChangeText={value => handleInputChange(value, index)}
                  style={[styles.mnemonicInput, isSubmitted && !isNotEmptyString(mnemonic[index]) && styles.error]}
                />
                <Text selectable={false} style={styles.wordIndex}>{`${index + 1}.`}</Text>
                {isNotEmptyString(mnemonic[index]) && isShowProtectLayout && index !== selectedInputIndex && (
                  <Pressable onPress={() => handleShowLayout(index)} style={styles.layout}>
                    <Text style={styles.layoutText}>Tap to reveal</Text>
                  </Pressable>
                )}
              </View>
            ))}
          </Column>
          <Column style={styles.wordsColumn}>
            {wordsColumn2.map((_, index) => {
              const countIndex = Math.ceil(index + 1 + wordsAmount / 2);
              const value = mnemonic[countIndex - 1];
              const iSelectedInput = selectedInputIndex === countIndex - 1;

              return (
                <View key={countIndex} style={styles.inputContainer}>
                  <TextInput
                    ref={el => (countIndex - 1 === selectedInputIndex ? el?.focus() : null)}
                    value={value}
                    onFocus={el => handleInputFocus(countIndex - 1, el)}
                    onBlur={handleInputBlur}
                    onChangeText={value => handleInputChange(value, countIndex - 1)}
                    style={[styles.mnemonicInput, isSubmitted && !isNotEmptyString(value) && styles.error]}
                  />
                  <Text selectable={false} style={styles.wordIndex}>
                    {`${countIndex}.`}
                  </Text>
                  {isNotEmptyString(value) && isShowProtectLayout && !iSelectedInput && (
                    <Pressable onPress={() => handleShowLayout(countIndex - 1)} style={styles.layout}>
                      <Text style={styles.layoutText}>Tap to reveal</Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </Column>
        </Row>

        <Row style={styles.buttons}>
          <TouchableOpacity onPress={handlePaste} style={styles.button}>
            <Icon name={IconNameEnum.Paste} iconStyle={styles.buttonIcon} />
            <Text style={styles.buttonText}>Paste</Text>
          </TouchableOpacity>
        </Row>
      </Column>

      {isNotEmptyString(error) && <Text style={styles.errorText}>{error}</Text>}
    </WalletCreationContainer>
  );
};
