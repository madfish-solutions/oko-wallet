import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I verify private key/, async () => {
  await Pages.RevealPrivateKey.privateKey.waitForDisplayed();
  const privateKey = await Pages.RevealPrivateKey.privateKey.getText();
  // eslint-disable-next-line jest/no-standalone-expect
  expect(privateKey).eql('0xc0fde2c769da79b73d7caebe7b195362a4195f0984e81fba7f979d9de36f3b0d');
});
