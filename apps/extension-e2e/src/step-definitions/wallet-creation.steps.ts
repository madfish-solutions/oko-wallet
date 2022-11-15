import { Given } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';
import { Pages } from '../page-objects';

Given(/I enter my mnemonic/, async () => {
  // save
});

Given(/I save my mnemonic/, async () => {
  const wordsArray = await Pages.CreateNewWallet.getWordsArray();

  BrowserContext.seedPhrase = wordsArray.join(' ');
});

Given(/I verify my mnemonic/, async () => {
  const wordsIndexes = await Pages.VerifyMnemonic.getWordIndexes();
  const wordsArray = BrowserContext.seedPhrase.split(' ');

  for (const wordIndex of wordsIndexes) {
    const word = wordsArray[wordIndex - 1];
    const wordButton = await Pages.VerifyMnemonic.getWordButton(word);

    await wordButton.click();
  }
});
