import { AddAccountTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/add-account.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AddNewAccountBySeedPage extends Page {
  addNewAccountTitle = createPageElement(AddAccountTestIDs.AddNewAccountTitle);

  async isVisible() {
    await this.addNewAccountTitle.waitForDisplayed();
  }
}
