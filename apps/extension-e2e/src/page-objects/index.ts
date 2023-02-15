import { AccountsSelectorPage } from './accounts-selector.page';
import { AccountsSettingsPage } from './accounts-settings.page';
import { AddNewAccountByPrivateKeyPage } from './add-new-account-by-private-key.page';
import { AddNewAccountBySeedPage } from './add-new-account-by-seed.page';
import { AddNewHdAccountPage } from './add-new-hd-account.page';
import { AlmostDonePage } from './almost-done.page';
import { CreateNewWalletPage } from './create-new-wallet.page';
import { ImportExistingWalletPage } from './import-existing-wallet.page';
import { RevealPrivateKeyPage } from './reveal-private-key.page';
import { RevealSeedPhrasePage } from './reveal-seed-phrase.page';
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
  RevealPrivateKey: new RevealPrivateKeyPage(),
  RevealSeedPhrase: new RevealSeedPhrasePage(),
  AccountsSelector: new AccountsSelectorPage(),
  AddNewHdAccount: new AddNewHdAccountPage(),
  AddNewAccountBySeed: new AddNewAccountBySeedPage(),
  AddNewAccountByPrivateKey: new AddNewAccountByPrivateKeyPage()
};
