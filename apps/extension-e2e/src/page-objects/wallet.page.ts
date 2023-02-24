import { HeaderSelectorsTestIDs } from '../../../../libs/ui/src/components/screen-components/header-container/components/header-selectors/header-selectors.test-ids';
import { HeaderTestIDs } from '../../../../libs/ui/src/screens/wallet/components/header/header.test-ids';
import { QrCodeTestIDs } from '../../../../libs/ui/src/screens/wallet/components/qr-code/qr-code.test-ids';
import { WalletTestIDs } from '../../../../libs/ui/src/screens/wallet/wallet.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class WalletPage extends Page {
  assetsWidget = createPageElement(WalletTestIDs.AssetsWidget);
  collectiblesWidget = createPageElement(WalletTestIDs.CollectiblesWidget);
  accountSelectorButton = createPageElement(HeaderSelectorsTestIDs.AccountSelectorButton);
  networkSelectorButton = createPageElement(HeaderSelectorsTestIDs.NetworkSelectorButton);
  showQrButton = createPageElement(HeaderTestIDs.ShowQRButton);
  publicKeyText = createPageElement(QrCodeTestIDs.PublicKeyText);

  async isVisible() {
    await this.assetsWidget.waitForDisplayed();
    await this.collectiblesWidget.waitForDisplayed();
    await this.accountSelectorButton.waitForDisplayed();
    await this.networkSelectorButton.waitForDisplayed();
  }
}
