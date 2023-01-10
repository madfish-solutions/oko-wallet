import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { DEFAULT_HD_ACCOUNT_PRIVATE_KEY } from '../classes/browser-context.class';
import { Pages } from '../page-objects';

Given(/I verify private key/, async () => {
  const privateKeyText = await Pages.RevealPrivateKey.privateKeyText.getText();

  expect(privateKeyText).eql(DEFAULT_HD_ACCOUNT_PRIVATE_KEY);
});
