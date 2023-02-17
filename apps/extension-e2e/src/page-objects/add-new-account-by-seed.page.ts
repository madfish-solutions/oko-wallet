import { AddBySeedPhraseTestIDs } from '../../../../libs/ui/src/modals/screens/add-account/components/seed-phrase/seed-phrase.test-ids';
import { Page } from '../classes/page.class';
import { SEED_PHRASE_FOR_IMPORT } from '../utils/env.utils';
import { createPageElement, findElements } from '../utils/search.utils';

export class AddNewAccountBySeedPage extends Page {
  seedPhraseContainer = createPageElement(AddBySeedPhraseTestIDs.SeedPhraseInput);

  async isVisible() {
    await this.seedPhraseContainer.waitForDisplayed();
  }

  async getWordsInputs() {
    return findElements(AddBySeedPhraseTestIDs.SeedPhraseInput);
  }

  async enterOldMnemonicStep() {
    const wordsArray = SEED_PHRASE_FOR_IMPORT.split(' ');
    const wordsInputs = await this.getWordsInputs();

    for (let i = 0; i < wordsArray.length; i++) {
      const word = wordsArray[i];
      const input = wordsInputs[i];

      await input.type(word);
    }
  }
}
