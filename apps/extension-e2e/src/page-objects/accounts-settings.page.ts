import { AccountsSettingsTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/accounts-settings.test-ids';
import { AccountsContainerTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/copmonents/accounts-container/accounts-container.test-ids';
import { HdAccountsTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/copmonents/hd-accounts/hd-accounts.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AccountsSettingsPage extends Page {
  accountsSettingsTitle = createPageElement(AccountsSettingsTestIDs.AccountsSettingsTitle);
  revealPrivateKeyButton = createPageElement(AccountsContainerTestIDs.RevealPrivateKeyText);
  revealSeedPhraseButton = createPageElement(HdAccountsTestIDs.RevealSeedPhraseButton);

  async isVisible() {
    await this.accountsSettingsTitle.waitForDisplayed();
    await this.revealPrivateKeyButton.waitForDisplayed();
    await this.revealSeedPhraseButton.waitForDisplayed();
  }
}
