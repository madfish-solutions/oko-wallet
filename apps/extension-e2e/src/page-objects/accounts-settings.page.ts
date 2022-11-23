import { AccountsSettingsTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/accounts-settings.test-ids';
import { AccoutsContainerTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/copmonents/accounts-container/accounts-container.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AccountsSettingsPage extends Page {
  accountsSettingsTitle = createPageElement(AccountsSettingsTestIDs.AccountsSettingsTitle);
  revealPrivateKey = createPageElement(AccoutsContainerTestIDs.RevealPrivateKey);

  async isVisible() {
    await this.accountsSettingsTitle.waitForDisplayed();
    await this.revealPrivateKey.waitForDisplayed();
  }
}
