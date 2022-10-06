import { Option } from '../components/dropdown/option.interface';

export type SeedWordsAmount = Option<number>;

export const words: SeedWordsAmount[] = [
  {
    id: 1,
    title: 'I  have  a 12 word phrase',
    value: 12
  },
  {
    id: 2,
    title: 'I  have  a 15 word phrase',
    value: 15
  },
  {
    id: 3,
    title: 'I  have  a 18 word phrase',
    value: 18
  },
  {
    id: 4,
    title: 'I  have  a 21 word phrase',
    value: 21
  },
  {
    id: 5,
    title: 'I  have  a 24 word phrase',
    value: 24
  }
];
