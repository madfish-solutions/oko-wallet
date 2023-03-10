import { ConfirmAccessTestIDs } from '../../../../libs/ui/src/modals/screens/confirm-access/tests/confirm-access.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class ConfirmAccessPage extends Page {
  confirmAccessTitle = createPageElement(ConfirmAccessTestIDs.ConfirmAccessTitle);
  revealSensitiveDataButton = createPageElement(ConfirmAccessTestIDs.RevealSensitiveDataButton);
  passwordInput = createPageElement(ConfirmAccessTestIDs.PasswordInput);

  async isVisible() {
    await this.confirmAccessTitle.waitForDisplayed();
    await this.revealSensitiveDataButton.waitForDisplayed();
    await this.passwordInput.waitForDisplayed();
  }
}
