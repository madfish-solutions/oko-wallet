import { Option } from '../components/dropdown/option.interface';

import { SeedWordsAmountTestIDs } from './seed-words-amount.test-ids';
//import { TestIDProps } from '../interfaces/test-id.interface'

export type SeedWordsAmount = Option<number>;

export const allMnemonicLengthValue = [12, 15, 18, 21, 24];

export const words: SeedWordsAmount[] = [
  {
    id: 1,
    title: 'I  have  a 12 word phrase',
    value: 12,
    testID: SeedWordsAmountTestIDs.WordsAmount12
  },
  {
    id: 2,
    title: 'I  have  a 15 word phrase',
    value: 15,
    testID: SeedWordsAmountTestIDs.WordsAmount15
  },
  {
    id: 3,
    title: 'I  have  a 18 word phrase',
    value: 18,
    testID: SeedWordsAmountTestIDs.WordsAmount18
  },
  {
    id: 4,
    title: 'I  have  a 21 word phrase',
    value: 21,
    testID: SeedWordsAmountTestIDs.WordsAmount21
  },
  {
    id: 5,
    title: 'I  have  a 24 word phrase',
    value: 24,
    testID: SeedWordsAmountTestIDs.WordsAmount24
  }
];

export const maxWordsLength = Array(words.slice(-1)[0].value).fill('');
