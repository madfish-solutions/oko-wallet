import { AddByPrivateKeyTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/components/private-key/private-key.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AddNewAccountByPrivateKeyPage extends Page {
  privateKeyInput = createPageElement(AddByPrivateKeyTestIDs.PrivateKeyInput);

  async isVisible() {
    await this.privateKeyInput.waitForDisplayed();
  }
}
