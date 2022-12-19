import { findElements } from './search.utils';

export const getMnemonicByTestID = async (testID: string) => {
  const elementHandlers = await findElements(testID);
  const textContents = elementHandlers.map(elementHandle => elementHandle.evaluate(element => element.textContent));
  const wordsArray = await Promise.all(textContents);

  return wordsArray.join(' ');
};
