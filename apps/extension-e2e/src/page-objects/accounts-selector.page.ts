import { HeaderCloseButtonTestIDs } from '../../../../libs/ui/src/components/navigator/components/header-close-button/header-close-button.test-ids';
import { SearchPanelTestIDs } from '../../../../libs/ui/src/components/search-panel/search-panel.test-ids';
import { AccountTabsTestIDs } from '../../../../libs/ui/src/modals/components/modal-render-item/modal-render-item.test-ids';
import { AccountsSelectorTestIDs } from '../../../../libs/ui/src/modals/screens/accounts-selector/accounts-selector.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements } from '../utils/search.utils';

export class AccountsSelectorPage extends Page {
  accountsScreenTitle = createPageElement(AccountsSelectorTestIDs.AccountsScreenTitle);
  accountAddingButton = createPageElement(SearchPanelTestIDs.AccountAddingIcon);
  accountsSettinButton = createPageElement(AccountsSelectorTestIDs.AccountsSettingsButton);
  closeAccountsModalButton = createPageElement(HeaderCloseButtonTestIDs.CloseButton);

  async isVisible() {
    await this.accountsScreenTitle.waitForDisplayed();
    await this.accountAddingButton.waitForDisplayed();
    await this.accountsSettinButton.waitForDisplayed();
  }

  async isAccountNameDisplayed(name: string) {
    const textElementHandler = await findElements(AccountTabsTestIDs.AccountsNames);
    const textContents = textElementHandler.map(elementHandle =>
      elementHandle.evaluate(element => element.textContent)
    );
    const namesArray = await Promise.all(textContents);

    return namesArray.includes(name);
  }
}
