import { AddAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/add-account.test-ids';
import { AccountAddingMethodsTestIDs } from '../../../../libs/ui/src/components/tabs/tabs-test-ids';
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

  elementHandlers.forEach(async () = >
  
  )
    

  }
    )
}
}

/*  const elementHandler = elementHandlers.find(async () => {
  const textElementHandler = await findElements(AccountAddingMethodsTestIDs.AddingMethodText);
  const textContents = textElementHandler.map(elementHandler = >
    elementHandler.evaluate(Element = > elementHandler.textContent)
    );
    const methodsArray = await Promise.all(textContents);