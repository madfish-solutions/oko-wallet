import { Given } from '@cucumber/cucumber';

import { Pages } from '../page-objects';

Given(/I select (.*) as account adding method/, async (addingMethod: string) => {
  const methodSelectorContainer = await Pages.AddNewHdAccount.getAddingMethodContainer(addingMethod);
  if (methodSelectorContainer === undefined) {
    throw new Error('Adding method is undefined');
  }
  await methodSelectorContainer.click();
});

Given(/I enter old mnemonic/, async () => {
  await Pages.AddNewAccountBySeed.enterOldMnemonicStep();
});
