import { NavigationBarTestIDs } from '../../../../libs/ui/src/components/navigation-bar/navigation-bar.test-ids';
import { Page } from '../classes/page.class';
import { createPageElement } from '../utils/search.utils';

export class NavigationBar extends Page {
  homeButton = createPageElement(NavigationBarTestIDs.HomeButton);
  receiveButton = createPageElement(NavigationBarTestIDs.ReceiveButton);
  sendButton = createPageElement(NavigationBarTestIDs.SendButton);
  settingsButton = createPageElement(NavigationBarTestIDs.SettingsButton);

  async isVisible() {
    await this.homeButton.waitForDisplayed();
    await this.receiveButton.waitForDisplayed();
    await this.sendButton.waitForDisplayed();
    await this.settingsButton.waitForDisplayed();
  }
}
