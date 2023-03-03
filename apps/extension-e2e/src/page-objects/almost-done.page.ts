import { AlmostDoneTestIDs } from '../../../../libs/ui/src/screens/almost-done/almost-done.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AlmostDonePage extends Page {
  passwordInput = createPageElement(AlmostDoneTestIDs.PasswordInput);
  passwordConfirmInput = createPageElement(AlmostDoneTestIDs.PasswordConfirmInput);
  createButton = createPageElement(AlmostDoneTestIDs.CreateButton);

  async isVisible() {
    await this.passwordInput.waitForDisplayed();
    await this.passwordConfirmInput.waitForDisplayed();
    await this.createButton.waitForDisplayed();
  }
}
