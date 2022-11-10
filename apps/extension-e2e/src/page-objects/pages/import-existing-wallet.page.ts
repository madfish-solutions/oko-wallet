import { findElement } from '../../utils/search.utils';
import { Page } from '../page.class';

export class ImportExistingWalletPage extends Page {
  seedPhraseInput = findElement('ImportWalletFromSeedPhraseSelectors.SeedPhraseInput');
  nextButton = findElement('ImportWalletFromSeedPhraseSelectors.NextButton');

  async isVisible() {
    await this.seedPhraseInput.waitForDisplayed();
    await this.nextButton.waitForDisplayed();
  }
}
