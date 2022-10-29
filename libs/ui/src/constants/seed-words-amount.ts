import { Option } from '../components/dropdown/option.interface';
import { SeedWordsAmountSelectorTestIDs } from './seed-words-amount.testIDs';

export type SeedWordsAmount = Option<number>;

export const allMnemonicLengthValue = [12, 15, 18, 21, 24];

export const words: SeedWordsAmount[] = [
  {
    id: 1,
    title: 'I  have  a 12 word phrase',
    value: 12,
    testID: SeedWordsAmountSelectorTestIDs.WordsAmount12
  },
  {
    id: 2,
    title: 'I  have  a 15 word phrase',
    value: 15,
    testID: SeedWordsAmountSelectorTestIDs.WordsAmount15
  },
  {
    id: 3,
    title: 'I  have  a 18 word phrase',
    value: 18,
    testID: SeedWordsAmountSelectorTestIDs.WordsAmount18
  },
  {
    id: 4,
    title: 'I  have  a 21 word phrase',
    value: 21,
    testID: SeedWordsAmountSelectorTestIDs.WordsAmount21
  },
  {
    id: 5,
    title: 'I  have  a 24 word phrase',
    value: 24,
    testID: SeedWordsAmountSelectorTestIDs.WordsAmount24
  }
];

export const maxWordsLength = Array(words.slice(-1)[0].value).fill('');
