import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I select (.*) as account adding method/, async (addingMethod: string) => {
  const methodSelectorContainer = await Pages.AddNewHdAccountPage.getAddingMethodContainer(addingMethod);
  if (methodSelectorContainer === undefined) {
    throw new Error('Adding method is undefined');
  }
  await methodSelectorContainer.click();
});
