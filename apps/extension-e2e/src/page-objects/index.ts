import { AccountsSettingsPage } from './accounts-settings.page';
import { AlmostDonePage } from './almost-done.page';
import { CreateNewWalletPage } from './create-new-wallet.page';
import { ImportExistingWalletPage } from './import-existing-wallet.page';
import { RevealPrivateKeyPage } from './reveal-private-key.page';
import { SettingsPage } from './settings.page';
import { VerifyMnemonicPage } from './verify-mnemonic.page';
import { WalletPage } from './wallet.page';
import { WelcomePage } from './welcome.page';

export const Pages = {
  Welcome: new WelcomePage(),
  CreateNewWallet: new CreateNewWalletPage(),
  ImportExistingWallet: new ImportExistingWalletPage(),
  VerifyMnemonic: new VerifyMnemonicPage(),
  AlmostDone: new AlmostDonePage(),
  Wallet: new WalletPage(),
  Settings: new SettingsPage(),
  AccountsSettings: new AccountsSettingsPage(),
  RevealPrivateKey: new RevealPrivateKeyPage()
};
