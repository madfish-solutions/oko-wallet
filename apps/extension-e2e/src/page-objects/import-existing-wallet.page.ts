import { ImportWalletTestIDs } from '../../../../libs/ui/src/screens/import-wallet/import-wallet.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements } from '../utils/search.utils';

export class ImportExistingWalletPage extends Page {
  nextButton = createPageElement(ImportWalletTestIDs.NextButton);

  async isVisible() {
    await this.nextButton.waitForDisplayed();
  }

  async getWordsInputs() {
    return findElements(ImportWalletTestIDs.WordInput);
  }
}
