import {WelcomePage} from "./pages/welcome.page";
import {ImportExistingWalletPage} from "./pages/import-existing-wallet.page";
import {CreateNewWalletPage} from "./pages/create-new-wallet.page";

export const Pages = {
    Welcome: new WelcomePage(),
    CreateNewWallet: new CreateNewWalletPage(),
    ImportExistingWallet: new ImportExistingWalletPage()
};
