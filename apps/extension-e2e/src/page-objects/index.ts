import { AlmostDonePage } from './almost-done.page';
import { CreateNewWalletPage } from './create-new-wallet.page';
import { ImportExistingWalletPage } from './import-existing-wallet.page';
import { VerifyMnemonicPage } from './verify-mnemonic.page';
import { WalletPage } from './wallet.page';
import { WelcomePage } from './welcome.page';

export const Pages = {
  Welcome: new WelcomePage(),
  CreateNewWallet: new CreateNewWalletPage(),
  ImportExistingWallet: new ImportExistingWalletPage(),
  VerifyMnemonic: new VerifyMnemonicPage(),
  AlmostDone: new AlmostDonePage(),
  Wallet: new WalletPage()
};
