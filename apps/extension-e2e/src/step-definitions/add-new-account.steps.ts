import { Given } from '@cucumber/cucumber';
import { expect } from 'chai';

import { Pages } from '../page-objects';

Given(/I select (*) as account adding method/, async () => {
  const methodSelectorContainer = await Pages.AddNewHdAccountPage.getAddingMethodContainer('Seed Phrase');
  expect(methodSelectorContainer).eql(true);
});
