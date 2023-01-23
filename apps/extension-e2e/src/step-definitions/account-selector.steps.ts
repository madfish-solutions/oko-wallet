import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I see Account 2 on the AccountsSelector page/, async () => {
  const accountSelectorContainer = await Pages.AccountsSelector.getAccountsSelectorContainer('Account 2');
  expect(accountSelectorContainer).eql(true);
});
