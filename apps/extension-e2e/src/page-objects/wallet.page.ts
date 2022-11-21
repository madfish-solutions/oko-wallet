import { WalletTestIDs } from '../../../../libs/ui/src/screens/wallet/wallet.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class WalletPage extends Page {
  assetsWidget = createPageElement(WalletTestIDs.AssetsWidget);
  collectiblesWidget = createPageElement(WalletTestIDs.CollectiblesWidget);

  async isVisible() {
    await this.assetsWidget.waitForDisplayed();
    await this.collectiblesWidget.waitForDisplayed();
  }
}
