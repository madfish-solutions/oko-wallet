import { CreateANewWalletTestIDs } from '../../../../libs/ui/src/screens/create-wallet/screens/create-a-new-wallet/create-a-new-wallet.test-ids';
import { Page } from '../classes/page.class';
import { getMnemonicByTestID } from '../utils/page.utils';
import { createPageElement } from '../utils/search.utils';

export class CreateNewWalletPage extends Page {
  tapToRevealLayout = createPageElement(CreateANewWalletTestIDs.TapToRevealLayout);
  mnemonicSavedCheckbox = createPageElement(CreateANewWalletTestIDs.MnemonicSavedCheckbox);
  nextButton = createPageElement(CreateANewWalletTestIDs.NextButton);
  savedSeedError = createPageElement(CreateANewWalletTestIDs.SavedSeedError);

  async isVisible() {
    await this.tapToRevealLayout.waitForDisplayed();
    await this.mnemonicSavedCheckbox.waitForDisplayed();
    await this.nextButton.waitForDisplayed();
  }

  async getMnemonic() {
    return getMnemonicByTestID(CreateANewWalletTestIDs.MnemonicWordText);
  }
}
