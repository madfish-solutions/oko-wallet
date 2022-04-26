import { createStore } from "./create-store";
import { tokensEpics } from "./tokens/tokens-epics";
import { walletEpics } from "./wallet/wallet-epics";

export const { store, persistor } = createStore(
  walletEpics,
  tokensEpics,
);
