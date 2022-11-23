import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/Mnemonic Saved Error/, async () => {
  const errorText = await Pages.CreateNewWallet.savedSeedError.getText();
  // eslint-disable-next-line jest/no-standalone-expect
  expect(errorText).eql('To continue, you need to confirm that you have saved your mnemonic');
});
