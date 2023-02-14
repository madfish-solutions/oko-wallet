import { AccountAddingMethodsTestIDs } from '../../../../libs/ui/src/components/tabs/tabs-test-ids';
import { AddAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/add-account.test-ids';
import { AddHdAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/components/create-hd/create-hd.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements } from '../utils/search.utils';

export class AddNewHdAccountPage extends Page {
  addNewAccountTitle = createPageElement(AddAccountTestIDs.AddNewAccountTitle);
  createHdAccountButton = createPageElement(AddHdAccountTestIDs.CreateButton);

  async isVisible() {
    await this.addNewAccountTitle.waitForDisplayed();
    await this.createHdAccountButton.waitForDisplayed();
  }

  async getAddingMethodContainer(addingMethod: string) {
    const elementHandlers = await findElements(AccountAddingMethodsTestIDs.MethodButton);
    const textContents = elementHandlers.map(elementHandle => elementHandle.evaluate(element => element.textContent));
    const textArray = await Promise.all(textContents);
    const elementIndex = textArray.findIndex(text => text === addingMethod);

    return elementHandlers[elementIndex];
  }
}
