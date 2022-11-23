import { SettingsTestIDs } from '../../../../libs/ui/src/screens/settings/settings.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class SettingsPage extends Page {
  accountsSettings = createPageElement(SettingsTestIDs.AccountsSettings);

  async isVisible() {
    await this.accountsSettings.waitForDisplayed();
  }
}
