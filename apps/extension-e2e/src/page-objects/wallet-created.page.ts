import { WalletCreatedTestIds } from '../../../../libs/ui/src/screens/wallet-created/wallet-created.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class WalletCreatedPage extends Page {
  acceptTermsCheckbox = createPageElement(WalletCreatedTestIds.AcceptTerms);
  getStartedButton = createPageElement(WalletCreatedTestIds.GetStarted);

  async isVisible() {
    await this.acceptTermsCheckbox.waitForDisplayed();
    await this.getStartedButton.waitForDisplayed();
  }
}
