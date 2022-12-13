import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { BrowserContext } from '../classes/browser-context.class';
import { Pages } from '../page-objects';

Given(/I check my mnemonic/, async () => {
  const mnemonic = await Pages.RevealSeedPhrase.getMnemonic();

  // eslint-disable-next-line jest/no-standalone-expect
  expect(mnemonic).eql(BrowserContext.seedPhrase);
});
