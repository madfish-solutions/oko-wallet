import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';
import { getPublicKeyVariable } from '../utils/public-key.utils';

Given(/I verify (imported by seed|imported by private key) public key/, async (accountPublicKey: string) => {
  const publicKey = getPublicKeyVariable(accountPublicKey);

  const publicKeyText = await Pages.Receive.publicKeyText.getText();

  expect(publicKeyText).eql(publicKey);
});
