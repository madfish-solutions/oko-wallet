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
import { allMnemonicLengthValue, words } from '../../constants/seed-words-amount';
import { ScreensEnum, ScreensParamList } from '../../enums/sreens.enum';
import { useNavigation } from '../../hooks/use-navigation.hook';
import { getCustomSize } from '../../styles/format-size';
import { formatMnemonic } from '../../utils/format-mnemonic.util';

import { styles } from './import-wallet.styles';

const maxWordsLength = Array(words.slice(-1)[0].value).fill('');

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
  const inputValueRef = useRef<string>('');

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
    inputValueRef.current = mnemonic[selectedInputIndex ?? 0];
  }, [selectedInputIndex]);

  useEffect(() => {
    if (isDefined(routeParams)) {
      setWordsAmount(routeParams.wordsAmount.value);
      setMnemonic(prev => prev.map((emptyField, index) => mnemonic[index] ?? emptyField));
    }
  }, [routeParams]);

  const predictMnemonicLength = (mnemonicLength: number) => {
    const isCurrentLengthExist = allMnemonicLengthValue.includes(mnemonicLength);

    if (isCurrentLengthExist) {
      return mnemonicLength;
    }

    let finalValue = allMnemonicLengthValue[0];
    let i = 0;

    while (i < allMnemonicLengthValue.length) {
      if (allMnemonicLengthValue[i] > mnemonicLength) {
        return (finalValue = allMnemonicLengthValue[i]);
      }
      i++;
    }

    return finalValue;
  };

  const handlePasteMnemonicFromClipboard = useCallback(() => {
    Clipboard.getString().then(clipboardValue => {
      const clipboardMnemonicTrim = clipboardValue.trim();

      if (isNotEmptyString(clipboardMnemonicTrim) && isDefined(clipboardMnemonicTrim)) {
        const clipboardMnemonic = clipboardMnemonicTrim.split(' ');
        const calculatedLength = predictMnemonicLength(clipboardMnemonic.length);
        const filledMnemonic = maxWordsLength.map((emptyString, index) => clipboardMnemonic[index] ?? emptyString);

        inputValueRef.current = filledMnemonic[selectedInputIndex ?? 0];
        setWordsAmount(calculatedLength);
        setSelectedInputIndex(null);
        setMnemonic(filledMnemonic);
      }
    });
  }, [selectedInputIndex]);

  const handleInputChange = useCallback(
    (value: string, index: number) => {
      if (value.length === inputValueRef.current.length + 1 || value.length < inputValueRef.current.length) {
        const newMnemonic = [...mnemonic];
        newMnemonic[index] = value;

        setMnemonic(newMnemonic);
        inputValueRef.current = value;
      } else {
        handlePasteMnemonicFromClipboard();
      }
    },
    [handlePasteMnemonicFromClipboard, mnemonic]
  );

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

    navigate(ScreensEnum.AlmostDone, { mnemonic: mnemonic.join(' '), currentStep: 2, stepsAmount: 2 });
  };

  return (
    <WalletCreationContainer
      title="Import Existing Wallet"
      currentStep={1}
      stepsAmount={2}
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
                    onChangeText={value => handleInputChange(value, index)}
                    style={[styles.mnemonicInput, isSubmitted && !isNotEmptyString(value) && styles.error]}
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

        <Row style={styles.buttons}>
          <TouchableOpacity onPress={handlePasteMnemonicFromClipboard} style={styles.button}>
            <Icon name={IconNameEnum.Paste} iconStyle={styles.buttonIcon} />
            <Text style={styles.buttonText}>Paste</Text>
          </TouchableOpacity>
        </Row>
      </Column>

      {isNotEmptyString(error) && <Text style={styles.errorText}>{error}</Text>}
    </WalletCreationContainer>
  );
};
