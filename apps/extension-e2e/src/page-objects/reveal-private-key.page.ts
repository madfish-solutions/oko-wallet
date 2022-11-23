import { RevealPrivateKeyTestIDs } from '../../../../libs/ui/src/modals/screens/reveal-private-key/reveal-private-key.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class RevealPrivateKeyPage extends Page {
  screenTitle = createPageElement(RevealPrivateKeyTestIDs.ScreenTitle);
  privateKey = createPageElement(RevealPrivateKeyTestIDs.PrivateKey);

  async isVisible() {
    await this.screenTitle.waitForDisplayed();
  }
}
