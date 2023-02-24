import { ReceiveTestIDs } from '../../../../libs/ui/src/screens/receive/receive.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class ReceivePage extends Page {
  publicKeyText = createPageElement(ReceiveTestIDs.PublicKeyText);

  async isVisible() {
    await this.publicKeyText.waitForDisplayed();
  }
}
