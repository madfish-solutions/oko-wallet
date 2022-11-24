import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { DEFAULT_HD_ACCOUNT } from '../classes/browser-context.class';
import { Pages } from '../page-objects';

Given(/I verify private key/, async () => {
  await Pages.RevealPrivateKey.privateKey.waitForDisplayed();
  const privateKey = await Pages.RevealPrivateKey.privateKey.getText();
  // eslint-disable-next-line jest/no-standalone-expect
  expect(privateKey).eql(DEFAULT_HD_ACCOUNT);
});
