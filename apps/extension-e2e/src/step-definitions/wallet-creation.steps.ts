import { Given } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';
import { Pages } from '../page-objects';
import { enterMyMnemonicStep } from '../utils/shared-steps.utils';

Given(/I enter my mnemonic/, async () => {
  await enterMyMnemonicStep();
});

Given(/I save my mnemonic/, async () => {
  BrowserContext.seedPhrase = await Pages.CreateNewWallet.getMnemonic();
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
