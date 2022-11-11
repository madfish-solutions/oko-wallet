import { CreateNewWalletPage } from './create-new-wallet.page';
import { ImportExistingWalletPage } from './import-existing-wallet.page';
import { WelcomePage } from './welcome.page';

export const Pages = {
  Welcome: new WelcomePage(),
  CreateNewWallet: new CreateNewWalletPage(),
  ImportExistingWallet: new ImportExistingWalletPage()
};
