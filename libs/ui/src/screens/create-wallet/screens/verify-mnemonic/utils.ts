import { Word } from './types';

export const getRandomMnemonicWords = (mnemonic: string[]) => {
  const wordsIndexes: number[] = [];

  while (wordsIndexes.length < 3) {
    const randomIndex = Math.round(Math.random() * (mnemonic.length - 1));

    if (
      !wordsIndexes.includes(randomIndex) &&
      !wordsIndexes.includes(randomIndex - 1) &&
      !wordsIndexes.includes(randomIndex + 1)
    ) {
      wordsIndexes.push(randomIndex);
    }
  }

  return wordsIndexes.reduce(
    (acc, currentIndex, index) => [
      ...acc,
      {
        id: index + 1,
        index: currentIndex + 1,
        word: mnemonic[currentIndex],
        selected: false,
        shuffledWordId: index + 1
      }
    ],
    [] as Word[]
  );
};
