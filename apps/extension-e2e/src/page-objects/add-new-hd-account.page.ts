import methods from '@cucumber/cucumber/lib/time';

import { AccountAddingMethodsTestIDs } from '../../../../libs/ui/src/components/tabs/tabs-test-ids';
import { AddAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/add-account.test-ids';
import { AddHdAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/components/create-hd/create-hd.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElement, findElements } from '../utils/search.utils';

export class AddNewHdAccountPage extends Page {
  addNewAccountTitle = createPageElement(AddAccountTestIDs.AddNewAccountTitle);
  createHdAccountButton = createPageElement(AddHdAccountTestIDs.CreateButton);

  async isVisible() {
    await this.addNewAccountTitle.waitForDisplayed();
    await this.createHdAccountButton.waitForDisplayed();
  }

  async getAddingMethodContainer(addingMethod: string) {
    const elementHandlers = await findElements(AccountAddingMethodsTestIDs.MethodButton);
    console.log('length', elementHandlers.length, 'addingMethod', addingMethod);
    const elementHandler = elementHandlers.find(async item => {
      const test = await item.evaluate(element => element.textContent);
      console.log('---', test);

      return test === 'Seed Phrase';
    });

    return elementHandler;
  }
}

/*

  async getAccountSelectorContainer(name: string) {
    const elementHandlers = await findElements(AccountsSelectorTestIDs.AccountsTabs);

    const elementHandler = elementHandlers.find(async element => {
      const textElementHandler = await findElement(AccountTabsTestIDs.AccountsNames, element);
      const textContent = await textElementHandler.evaluate(element => element.textContent);

      return textContent === name;
    });

    return elementHandler;
  }
}

/*  const elementHandler = elementHandlers.find(async () => {
  const textElementHandler = await findElements(AccountAddingMethodsTestIDs.AddingMethodText);
  const textContents = textElementHandler.map(elementHandler = >
    elementHandler.evaluate(Element = > elementHandler.textContent)
    );
    const methodsArray = await Promise.all(textContents);
    */
