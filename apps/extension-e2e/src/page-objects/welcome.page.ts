import { WelcomeTestIds } from '../../../../libs/ui/src/screens/welcome/welcome.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class WelcomePage extends Page {
  createNewWalletButton = createPageElement(WelcomeTestIds.CrateNewWalletButton);
  importExistingWalletButton = createPageElement(WelcomeTestIds.ImportExistingWalletButton);

  async isVisible() {
    await this.createNewWalletButton.waitForDisplayed();
    await this.importExistingWalletButton.waitForDisplayed();
  }
}
