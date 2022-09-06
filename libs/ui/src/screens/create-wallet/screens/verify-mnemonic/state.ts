import { ShuffleWord, Word } from './types';

export const wordsInitialState: Word[] = [
  {
    id: 1,
    index: 1,
    word: '',
    selected: false,
    shuffledWordId: 0
  },
  {
    id: 2,
    index: 2,
    word: '',
    selected: false,
    shuffledWordId: 0
  },
  {
    id: 3,
    index: 3,
    word: '',
    selected: false,
    shuffledWordId: 0
  }
];

export const shuffledInitialState: ShuffleWord[] = [
  {
    shuffledId: 1,
    word: '',
    selected: false
  },
  {
    shuffledId: 2,
    word: '',
    selected: false
  },
  {
    shuffledId: 3,
    word: '',
    selected: false
  }
];
