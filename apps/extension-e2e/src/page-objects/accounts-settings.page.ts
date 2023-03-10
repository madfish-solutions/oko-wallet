import { AccountsListTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/components/accounts-list/accounts-list.test-ids';
import { AccountsSettingsTestIDs } from '../../../../libs/ui/src/screens/settings/screens/accounts-settings/tests/accounts-settings.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class AccountsSettingsPage extends Page {
  accountsSettingsTitle = createPageElement(AccountsSettingsTestIDs.AccountsSettingsTitle);
  accountButton = createPageElement(AccountsListTestIDs.AccountButton);

  async isVisible() {
    await this.accountsSettingsTitle.waitForDisplayed();
    await this.accountButton.waitForDisplayed();
  }
}
