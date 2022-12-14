import { RevealSeedPhrasePageTestIDs } from '../../../../libs/ui/src/modals/screens/reveal-seed-phrase/reveal-seed-phrase.test-ids';
import { Page } from '../classes/page.class';
import { getMnemonicByTestID } from '../utils/page.utils';
import { createPageElement } from '../utils/search.utils';

export class RevealSeedPhrasePage extends Page {
  tapToRevealLayoutInSettings = createPageElement(RevealSeedPhrasePageTestIDs.TapToRevealLayoutInSettings);

  async isVisible() {
    await this.tapToRevealLayoutInSettings.waitForDisplayed();
  }

  async getMnemonic() {
    return getMnemonicByTestID(RevealSeedPhrasePageTestIDs.MnemonicWordsTextInSettings);
  }
}
