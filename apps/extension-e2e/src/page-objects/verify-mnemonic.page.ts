import { VerifyMnemonicTestIDs } from '../../../../libs/ui/src/screens/create-wallet/screens/verify-mnemonic/verify-mnemonic.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement, findElements } from '../utils/search.utils';

export class VerifyMnemonicPage extends Page {
  nextButton = createPageElement(VerifyMnemonicTestIDs.NextButton);

  async isVisible() {
    await this.nextButton.waitForDisplayed();
  }

  async getWordIndexes() {
    const elementHandlers = await findElements(VerifyMnemonicTestIDs.WordIndexText);
    const textContents = elementHandlers.map(elementHandle => elementHandle.evaluate(element => element.textContent));

    const textArray = await Promise.all(textContents);

    return textArray.map(text => {
      if (text === null) {
        return 0;
      }

      const textWithoutDot = text.replace(/\./g, '');

      return Number(textWithoutDot);
    });
  }

  async getWordButton(word: string) {
    const elementHandlers = await findElements(VerifyMnemonicTestIDs.WordButton);
    const textContents = elementHandlers.map(elementHandle => elementHandle.evaluate(element => element.textContent));

    const textArray = await Promise.all(textContents);
    const elementIndex = textArray.findIndex(text => text === word);

    return elementHandlers[elementIndex];
  }
}
