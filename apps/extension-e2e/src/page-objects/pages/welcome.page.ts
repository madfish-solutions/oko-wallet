import { Page } from '../page.class';
import {findElement} from "../../utils/search.utils";

export class WelcomePage extends Page {
  createNewWalletButton = findElement('WelcomeSelectors.CreateNewWalletButton');
  importExistingWalletButton = findElement('WelcomeSelectors.ImportExistingWalletButton');

  async isVisible() {
    await this.createNewWalletButton.waitForDisplayed();
    await this.importExistingWalletButton.waitForDisplayed();
  }
}
