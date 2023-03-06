import { EditAccountTestIDs } from '../../../../libs/ui/src/screens/edit-account/tests/edit-account.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class EditAccountPage extends Page {
  editAccountTitle = createPageElement(EditAccountTestIDs.EditAccountTitle);
  revealPrivateKeyButton = createPageElement(EditAccountTestIDs.RevealPrivateKeyButton);

  async isVisible() {
    await this.editAccountTitle.waitForDisplayed();
    await this.revealPrivateKeyButton.waitForDisplayed();
  }
}
