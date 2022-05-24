import { StoreController, getStoreController } from './store';
import { WalletController, getWalletController } from './wallet';

interface IAppControllers {
  store: StoreController;
  wallet: WalletController;
}

let controllers: IAppControllers | undefined;

export function setupAppControllers(): IAppControllers {
  const wallet = getWalletController();
  const store = getStoreController();
  controllers = { store, wallet };

  return controllers;
}

export function getAppControllers(): IAppControllers {
  let _controllers = controllers;
  if (!_controllers) {
    _controllers = setupAppControllers();
  }

  return _controllers;
}
