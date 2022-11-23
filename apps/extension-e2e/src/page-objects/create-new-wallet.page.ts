import { CreateANewWalletTestIDs } from '../../../../libs/ui/src/screens/create-wallet/screens/create-a-new-wallet/create-a-new-wallet.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements } from '../utils/search.utils';

export class CreateNewWalletPage extends Page {
  tapToRevealLayout = createPageElement(CreateANewWalletTestIDs.TapToRevealLayout);
  mnemonicSavedCheckbox = createPageElement(CreateANewWalletTestIDs.MnemonicSavedCheckbox);
  nextButton = createPageElement(CreateANewWalletTestIDs.NextButton);

  async isVisible() {
    await this.tapToRevealLayout.waitForDisplayed();
    await this.mnemonicSavedCheckbox.waitForDisplayed();
    await this.nextButton.waitForDisplayed();
  }

  async getWordsArray() {
    const elementHandlers = await findElements(CreateANewWalletTestIDs.MnemonicWordText);
    const textContents = elementHandlers.map(elementHandle => elementHandle.evaluate(element => element.textContent));

    return Promise.all(textContents);
  }
}
