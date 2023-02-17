import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';
import { DEFAULT_HD_ACCOUNT_FIRST_PRIVATE_KEY } from '../utils/env.utils';

Given(/I verify private key/, async () => {
  const privateKeyText = await Pages.RevealPrivateKey.privateKeyText.getText();

  expect(privateKeyText).eql(DEFAULT_HD_ACCOUNT_FIRST_PRIVATE_KEY);
});
