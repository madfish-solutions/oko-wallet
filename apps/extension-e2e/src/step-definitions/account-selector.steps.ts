import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I see (.*) on the AccountsSelector page/, async (accountName: string) => {
  const accountSelectorContainer = await Pages.AccountsSelector.isAccountNameDisplayed(accountName);
  expect(accountSelectorContainer).eql(true);
});
