import { Given } from '@cucumber/cucumber';

import { Pages } from '../page-objects';

Given(/I click Account 1 on the AccountsSelector page/, async () => {
  const accountSelectorContainer = await Pages.AccountsSelector.getAccountSelectorContainer('Account 1');
  console.log(accountSelectorContainer);
  
  await accountSelectorContainer?.click();
});
