import { SearchPanelTestIDs } from '../../../../libs/ui/src/components/search-panel/search-panel.test-ids';
import { AccountTabsTestIDs } from '../../../../libs/ui/src/modals/components/modal-render-item/modal-render-item.test-ids';
import { AccountsSelectorTestIDs } from '../../../../libs/ui/src/modals/screens/accounts-selector/accounts-selector.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements } from '../utils/search.utils';

export class AccountsSelectorPage extends Page {
  accountsScreenTitle = createPageElement(AccountsSelectorTestIDs.AccountsScreenTitle);
  accountAddingButton = createPageElement(SearchPanelTestIDs.AccountAddingIcon);

  async isVisible() {
    await this.accountsScreenTitle.waitForDisplayed();
    await this.accountAddingButton.waitForDisplayed();
  }

  async getAccountsSelectorContainer(name: string) {
    let result = false;
    const textElementHandler = await findElements(AccountTabsTestIDs.AccountsNames);
    const textContents = textElementHandler.map(elementHandle =>
      elementHandle.evaluate(element => element.textContent)
    );
    const namesArray = await Promise.all(textContents);
    result = namesArray.includes(name);
    console.log(namesArray, 'name-', name, 'result', result);

    return result;
  }
}
