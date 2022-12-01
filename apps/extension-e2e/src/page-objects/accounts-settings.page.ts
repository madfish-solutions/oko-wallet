import { AccountsSettingsTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/accounts-settings.test-ids';
import { AccountsContainerTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/copmonents/accounts-container/accounts-container.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AccountsSettingsPage extends Page {
  accountsSettingsTitle = createPageElement(AccountsSettingsTestIDs.AccountsSettingsTitle);
  revealPrivateKeyText = createPageElement(AccountsContainerTestIDs.RevealPrivateKeyText);

  async isVisible() {
    await this.accountsSettingsTitle.waitForDisplayed();
    await this.revealPrivateKeyText.waitForDisplayed();
  }
}
