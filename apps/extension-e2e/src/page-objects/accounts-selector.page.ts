import { SearchPanelTestIDs } from '../../../../libs/ui/src/components/search-panel/search-panel.test-ids';
import { AccountTabsTestIDs } from '../../../../libs/ui/src/modals/components/modal-render-item/modal-render-item.test-ids';
import { AccountsSelectorTestIDs } from '../../../../libs/ui/src/modals/screens/accounts-selector/accounts-selector.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements, findElement } from '../utils/search.utils';

export class AccountsSelectorPage extends Page {
  accountsScreenTitle = createPageElement(AccountsSelectorTestIDs.AccountsScreenTitle);
  accountAddingButton = createPageElement(SearchPanelTestIDs.AccountAddingIcon);

  async isVisible() {
    await this.accountsScreenTitle.waitForDisplayed();
    await this.accountAddingButton.waitForDisplayed();
  }

  async getAccountSelectorContainer(name: string) {
    const elementHandlers = await findElements(AccountsSelectorTestIDs.AccountsTabs);

    const elementHandler = elementHandlers.find(async element => {
      const textElementHandler = await findElement(AccountTabsTestIDs.AccountsNames, element);
      const textContent = await textElementHandler.evaluate(element => element.textContent);

      return textContent === name;
    });

    return elementHandler;
  }
}
