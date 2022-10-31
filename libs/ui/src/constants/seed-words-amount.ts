import { Option } from '../components/dropdown/option.interface';

export type SeedWordsAmount = Option<number>;

export enum MnemonicLengthEnum {
  Twelve = 12,
  Fifteen = 15,
  Eighteen = 18,
  TwentyOne = 21,
  TwentyFour = 24
}

export const allMnemonicLengthValue = [
  MnemonicLengthEnum.Twelve,
  MnemonicLengthEnum.Fifteen,
  MnemonicLengthEnum.Eighteen,
  MnemonicLengthEnum.TwentyOne,
  MnemonicLengthEnum.TwentyFour
];

export const words: SeedWordsAmount[] = [
  {
    id: 1,
    title: 'I  have  a 12 word phrase',
    value: MnemonicLengthEnum.Twelve
  },
  {
    id: 2,
    title: 'I  have  a 15 word phrase',
    value: MnemonicLengthEnum.Fifteen
  },
  {
    id: 3,
    title: 'I  have  a 18 word phrase',
    value: MnemonicLengthEnum.Eighteen
  },
  {
    id: 4,
    title: 'I  have  a 21 word phrase',
    value: MnemonicLengthEnum.TwentyOne
  },
  {
    id: 5,
    title: 'I  have  a 24 word phrase',
    value: MnemonicLengthEnum.TwentyFour
  }
];

export const createANewWalletWords: SeedWordsAmount[] = [
  {
    id: 1,
    title: 'I  have  a 12 word phrase',
    value: MnemonicLengthEnum.Twelve
  },
  {
    id: 5,
    title: 'I  have  a 24 word phrase',
    value: MnemonicLengthEnum.TwentyFour
  }
];

export const maxWordsLength = Array(words.slice(-1)[0].value).fill('');
