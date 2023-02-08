import { Given } from '@cucumber/cucumber';

import { BrowserContext } from '../classes/browser-context.class';
import { Pages } from '../page-objects';
import { getInputText } from '../utils/input.utils';
import { createPageElement } from '../utils/search.utils';
import { enterMyMnemonicStep } from '../utils/shared-steps.utils';

Given(/^I am on the (\w+) page$/, { timeout: 5001 }, async (page: keyof typeof Pages) => {
  await Pages[page].isVisible();
});

Given(/I press (.*) on the (.*) page/, async (elementName: string, pageName: string) => {
  await createPageElement(`${pageName}/${elementName}`).click();
});

Given(
  /I enter (seed|password) into (.*) on the (.*) page/,
  async (inputType: string, elementName: string, pageName: string) => {
    const inputText = getInputText(inputType);

    await createPageElement(`${pageName}/${elementName}`).type(inputText);
  }
);

Given(/I have imported account/, async () => {
  await Pages.Welcome.isVisible();
  await Pages.Welcome.importExistingWalletButton.click();

  await Pages.ImportExistingWallet.isVisible();
  await enterMyMnemonicStep();
  await Pages.ImportExistingWallet.nextButton.click();

  await Pages.AlmostDone.isVisible();
  await Pages.AlmostDone.passwordInput.type(BrowserContext.password);
  await Pages.AlmostDone.passwordConfirmInput.type(BrowserContext.password);
  await Pages.AlmostDone.acceptTermsCheckbox.click();
  await Pages.AlmostDone.createButton.click();

  await Pages.Wallet.isVisible();
});
