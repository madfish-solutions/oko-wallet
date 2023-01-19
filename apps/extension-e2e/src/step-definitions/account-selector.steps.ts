import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I see Account 2 on the AccountsSelector page/, async () => {
  const accountSelectorContainer = await Pages.AccountsSelector.getAccountSelectorContainer('Account 2');

  // eslint-disable-next-line jest/no-standalone-expect
  expect(accountSelectorContainer).not(undefined);
  const accountName = await Pages.AccountsSelector.getAccountsNames();
  console.log('accName ---', accountName);

  accountName.includes('Account 2');
  console.log(accountName.includes('Account 2'));
});
