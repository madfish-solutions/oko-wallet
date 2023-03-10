import { SettingsTestIDs } from '../../../../libs/ui/src/screens/settings/settings.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class SettingsPage extends Page {
  accountsSettingsButton = createPageElement(SettingsTestIDs.AccountsSettingsButton);
  revealSeedPhraseButton = createPageElement(SettingsTestIDs.AccountsSettingsButton);

  async isVisible() {
    await this.accountsSettingsButton.waitForDisplayed();
    await this.revealSeedPhraseButton.waitForDisplayed();
  }
}
