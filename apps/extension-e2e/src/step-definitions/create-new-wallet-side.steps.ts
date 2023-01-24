import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I verify Mnemonic Saved Error/, async () => {
  const errorText = await Pages.CreateNewWallet.savedSeedError.getText();

  expect(errorText).eql('To continue, you need to confirm that you have saved your mnemonic');
});
