import { InitialTestIDs } from '../../../../libs/ui/src/screens/initial/initial.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class WelcomePage extends Page {
  createNewWalletButton = createPageElement(InitialTestIDs.CrateNewWalletButton);
  importExistingWalletButton = createPageElement(InitialTestIDs.ImportExistingWalletButton);

  async isVisible() {
    await this.createNewWalletButton.waitForDisplayed();
    await this.importExistingWalletButton.waitForDisplayed();
  }
}
