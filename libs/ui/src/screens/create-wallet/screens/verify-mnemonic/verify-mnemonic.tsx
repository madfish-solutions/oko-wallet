import { RouteProp, useRoute } from '@react-navigation/native';
import { isNotEmptyString } from '@rnw-community/shared';
import { shuffle } from 'lodash';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import { Column } from '../../../../components/column/column';
import { Row } from '../../../../components/row/row';
import { Text } from '../../../../components/text/text';
import { WalletCreationContainer } from '../../../../components/wallet-creation-container/wallet-creation-container';
import { ScreensEnum, ScreensParamList } from '../../../../enums/sreens.enum';
import { useNavigation } from '../../../../hooks/use-navigation.hook';

import { shuffledInitialState, wordsInitialState } from './state';
import { SelectedContainer, ShuffleWord, Word } from './types';
import { getRandomMnemonicWords } from './utils';
import { styles } from './verify-mnemonic.styles';
import { VerifyMnemonicTestIDs } from './verify-mnemonic.test-ids';

export const VerifyMnemonic: FC = () => {
  const {
    params: { mnemonic }
  } = useRoute<RouteProp<ScreensParamList, ScreensEnum.VerifyMnemonic>>();
  const { navigate } = useNavigation();

  const [correctWordOrder, setCorrectWordOrder] = useState<Word[]>(wordsInitialState);
  const [words, setWords] = useState<Word[]>(wordsInitialState);
  const [shuffledWords, setShuffledWords] = useState<ShuffleWord[]>(shuffledInitialState);
  const [selectedContainer, setSelectedContainer] = useState<SelectedContainer>({
    id: words[0].id,
    // force: true - force stay on the select container
    force: false
  });
  // 0 - any container is not selected;
  // 3 - max steps
  const [stepCounter, setStepCounter] = useState(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const isEmptyWordExist = words.find(item => isNotEmptyString(item.word));
    if (isEmptyWordExist) {
      setError('');
    }

    const allWordsAreSelected = words.every(item => !isNotEmptyString(item.word));
    if (allWordsAreSelected) {
      setSelectedContainer({ id: words[0].id, force: false });
    }
  }, [words]);

  // Initial setup
  useEffect(() => {
    const randomWords = getRandomMnemonicWords(mnemonic).sort((a, b) => a.index - b.index);

    setCorrectWordOrder(randomWords);
    setWords(randomWords.map(item => ({ ...item, word: '', shuffledWordId: 0 })));
    setShuffledWords(
      shuffle([...randomWords.map(item => ({ word: item.word, selected: false, shuffledId: item.shuffledWordId }))])
    );
    setSelectedContainer({ id: randomWords[0].id, force: false });
  }, [mnemonic]);

  // choose next container
  useEffect(() => {
    let nextSelectContainerdId = 0;

    words.find(item => {
      if (item.word === '') {
        return (nextSelectContainerdId = item.id);
      }
    });

    setSelectedContainer(prev =>
      !prev.force ? { id: nextSelectContainerdId, force: false } : { ...prev, force: false }
    );
  }, [words]);

  const handleSelectShuffledWord = useCallback(
    ({ word, shuffledId }: ShuffleWord) => {
      setStepCounter(prev => prev + 1);

      setWords(prev =>
        prev.map(item => {
          if (item.id === selectedContainer.id) {
            return {
              ...item,
              word,
              shuffledWordId: shuffledId
            };
          }

          return item;
        })
      );

      setShuffledWords(prev =>
        prev.map(item => {
          if (item.shuffledId === shuffledId) {
            return {
              ...item,
              selected: true
            };
          }

          return item;
        })
      );

      // if previous value is 2 then all words was selected
      if (stepCounter === 2) {
        return setSelectedContainer({ id: 0, force: false });
      }
    },
    [selectedContainer, stepCounter]
  );

  const handleSelectContainerOrResetWord = (id: number, shuffledWordId: number, word: string) => {
    if (isNotEmptyString(word)) {
      setSelectedContainer({ id, force: true });

      setStepCounter(prev => prev - 1);

      setWords(prev =>
        prev.map(item => {
          if (item.id === id) {
            return {
              ...item,
              word: ''
            };
          }

          return item;
        })
      );

      setShuffledWords(prev =>
        prev.map(item => {
          if (item.shuffledId === shuffledWordId) {
            return {
              ...item,
              selected: false
            };
          }

          return item;
        })
      );
    } else {
      setSelectedContainer({ id, force: false });
    }
  };

  const navigateToAlmostDoneScreen = () => {
    if (JSON.stringify(correctWordOrder) === JSON.stringify(words)) {
      return navigate(ScreensEnum.AlmostDone, {
        mnemonic: mnemonic.join(' '),
        currentStep: 3,
        stepsAmount: 3
      });
    }

    const allWordsAreSelected = words.every(item => isNotEmptyString(item.word));
    if (allWordsAreSelected) {
      const resetWords = words.map(item => ({ ...item, word: '' }));
      const resetShuffledWords = shuffledWords.map(item => ({ ...item, selected: false }));

      setWords(resetWords);
      setShuffledWords(resetShuffledWords);

      return setError('Wrong combination. Try again.');
    }

    return setError('Please, select all the words.');
  };

  return (
    <WalletCreationContainer
      title="Verify Mnemonic"
      currentStep={2}
      isSubmitDisabled={!!error}
      onSubmitPress={navigateToAlmostDoneScreen}
      submitButtonTestID={VerifyMnemonicTestIDs.NextButton}
    >
      <Text style={styles.title}>Confirm you saved mnemonic</Text>
      <Text style={styles.description}>
        You need to put the words in the correct positions according to their number
      </Text>

      <Column style={[styles.container, isNotEmptyString(error) && styles.containerError]}>
        <Row style={styles.wordsWrapper}>
          <Row style={styles.wordsColumn}>
            {words.map(({ id, index, word, shuffledWordId }, arrayIndex) => (
              <Pressable
                key={`${word}_${id}`}
                onPress={() => handleSelectContainerOrResetWord(id, shuffledWordId, word)}
                style={[
                  styles.mnemonicItem,
                  id === selectedContainer.id && styles.active,
                  arrayIndex % 2 === 0 && styles.marginRight
                ]}
              >
                <Text
                  selectable={false}
                  style={styles.wordIndex}
                  testID={VerifyMnemonicTestIDs.WordIndexText}
                >{`${index}.`}</Text>
                <Text selectable={false} style={styles.word}>
                  {word}
                </Text>
              </Pressable>
            ))}
          </Row>
        </Row>

        <Text style={styles.wordsSelectorTitle}>Pick word you need</Text>
        <Row style={styles.wordsSelector}>
          {shuffledWords.map(({ word, selected, shuffledId }, index) => (
            <Pressable
              key={`${word}_${shuffledId}`}
              onPress={() => handleSelectShuffledWord({ word, selected, shuffledId })}
              style={[
                styles.wordButton,
                index !== shuffledWords.length - 1 && styles.marginRight,
                selected && styles.selectedWord
              ]}
              disabled={selected}
              testID={VerifyMnemonicTestIDs.WordButton}
            >
              <Text style={styles.wordButtonText}>{word}</Text>
            </Pressable>
          ))}
        </Row>
      </Column>

      {isNotEmptyString(error) && <Text style={styles.error}>{error}</Text>}
    </WalletCreationContainer>
  );
};
