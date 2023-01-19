import { AddAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/add-account.test-ids';
import { AddHdAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/components/create-hd/create-hd.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AddNewHdAccountPage extends Page {
  addNewAccountTitle = createPageElement(AddAccountTestIDs.AddNewAccountTitle);
  createHdAccountButton = createPageElement(AddHdAccountTestIDs.CreateButton);

  async isVisible() {
    await this.addNewAccountTitle.waitForDisplayed();
    await this.createHdAccountButton.waitForDisplayed();
  }
}
