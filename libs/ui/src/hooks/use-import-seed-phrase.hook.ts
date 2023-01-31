import Clipboard from '@react-native-clipboard/clipboard';
import { isDefined, isNotEmptyString } from '@rnw-community/shared';
import { validateMnemonic } from 'bip39';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { SECURITY_TIME } from '../constants/defaults';
import { allMnemonicLengthValue, maxWordsLength, SeedWordsAmount, words } from '../constants/seed-words-amount';
import { ScreensEnum } from '../enums/sreens.enum';
import { handleSetValueToClipboard } from '../utils/copy-to-clipboard.util';

import { useNavigation } from './use-navigation.hook';
import { useScrollToOffset } from './use-scroll-to-element.hook';

export const useImportSeedPhrase = (wordsAmountParam: SeedWordsAmount | undefined) => {
  const wordsAmountState = wordsAmountParam ?? words[0];

  const { navigate } = useNavigation();
  const { scrollViewRef, scrollToOffset } = useScrollToOffset();

  const [wordsAmount, setWordsAmount] = useState(wordsAmountState.value);
  const [mnemonic, setMnemonic] = useState<string[]>(maxWordsLength);
  const [isShowProtectLayout, setIsShowProtectLayout] = useState(true);
  const [selectedInputIndex, setSelectedInputIndex] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (isDefined(wordsAmountParam)) {
      setWordsAmount(wordsAmountParam.value);
      setMnemonic(prev => prev.map((emptyField, index) => mnemonic[index] ?? emptyField));
    }
  }, [wordsAmountParam]);

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
      const clipboardMnemonicTrim = clipboardValue
        .split(' ')
        .filter(word => isNotEmptyString(word.trim()))
        .join(' ');

      if (isNotEmptyString(clipboardMnemonicTrim) && isDefined(clipboardMnemonicTrim)) {
        const clipboardMnemonic = clipboardMnemonicTrim.split(' ');
        const calculatedLength = predictMnemonicLength(clipboardMnemonic.length);
        const filledMnemonic = maxWordsLength.map((emptyString, index) => clipboardMnemonic[index] ?? emptyString);

        setWordsAmount(calculatedLength);
        setSelectedInputIndex(null);
        setMnemonic(filledMnemonic);
        handleSetValueToClipboard('');
      }
    });
  }, [selectedInputIndex]);

  const handleInputChange = useCallback(
    (value: string, index: number) => {
      const oldValue = mnemonic[index];

      if (value.length === oldValue.length + 1 || value.length < oldValue.length) {
        const newMnemonic = [...mnemonic];
        newMnemonic[index] = value;

        setMnemonic(newMnemonic);
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
      scrollToOffset();
    }
  }, [error]);

  const checkErrors = () => {
    if (isEmptyFieldsExist) {
      setError('Please, enter all the words.');

      return true;
    }

    const currentMnemonic = mnemonic.map(word => word.trim()).filter(word => isNotEmptyString(word));

    if (!validateMnemonic(currentMnemonic.join(' '))) {
      setError('Wrong combination. Try again.');

      return true;
    }

    return false;
  };

  return {
    handleInputChange,
    navigateToWordsAmountSelector,
    handleShowLayout,
    handleInputFocus,
    handleInputBlur,
    checkErrors,
    handlePasteMnemonicFromClipboard,
    setIsSubmitted,
    scrollToOffset,
    isEmptyFieldsExist,
    mnemonic,
    error,
    scrollViewRef,
    wordsAmount,
    selectedInputIndex,
    isShowProtectLayout,
    isSubmitted
  };
};
