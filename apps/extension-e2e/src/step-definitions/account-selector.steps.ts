import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I see (.*) on the AccountsSelector page/, async (accountName: string) => {
  const accountNameDisplaying = await Pages.AccountsSelector.isAccountNameDisplayed(accountName);
  expect(accountNameDisplaying).eql(true);
});
