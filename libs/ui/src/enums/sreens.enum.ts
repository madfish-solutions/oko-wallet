import { AccountInterface } from 'shared';

import { GetQuoteResponse } from '../api/1inch/types';
import { Option } from '../components/dropdown/option.interface';
import { SeedWordsAmount } from '../constants/seed-words-amount';
import { DAppInfo, DAppTransactionInfo } from '../interfaces/dapp-info.interface';
import { NetworkInterface } from '../interfaces/network.interface';
import { Token } from '../interfaces/token.interface';
import { TransferParams } from '../interfaces/transfer-params.interface';
import { ActivityFilterEnum } from '../modals/screens/activity-filter-selector/activity-filter.enum';
import { SendParams } from '../screens/send/types';

export enum ScreensEnum {
  ImportWallet = 'ImportWallet',
  ManageTokens = 'ManageTokens',
  Receive = 'Receive',
  SendToken = 'SendToken',
  SendCollectible = 'SendCollectible',
  TokensSelector = 'TokensSelector',
  SendCollectiblesSelector = 'SendCollectiblesSelector',
  SendAccountsSelector = 'SendAccountsSelector',
  SendConfirmation = 'SendConfirmation',
  Settings = 'Settings',
  AccountsSettings = 'AccountsSettings',
  RevealPrivateKey = 'RevealPrivateKey',
  RevealSeedPhrase = 'RevealSeedPhrase',
  SettingsGeneral = 'SettingsGeneral',
  SettingsCurrencySelector = 'SettingsCurrencySelector',
  ActivityFilterSelector = 'ActivityFilterSelector',
  SettingsAppearanceSelector = 'SettingsAppearanceSelector',
  SettingsSecurity = 'SettingsSecurity',
  SettingsLockTimeSelector = 'SettingsLockTimeSelector',
  SettingsAboutUs = 'SettingsAboutUs',
  SettingsResetWalletConfirm = 'SettingsResetWalletConfirm',
  Wallet = 'Wallet',
  ConnectToDapps = 'ConnectToDapps',
  Unlock = 'Unlock',
  AccountsSelector = 'AccountsSelector',
  NetworksSelector = 'NetworksSelector',
  EditAccount = 'EditAccount',
  EditAccountName = 'EditAccountName',
  AddAccount = 'AddAccount',
  AddNetwork = 'AddNetwork',
  EditNetwork = 'EditNetwork',
  DAppConnectionConfirmation = 'DAppConnectionConfirmation',
  AddNewToken = 'AddNewToken',
  EditToken = 'EditToken',
  Tokens = 'Tokens',
  ScanQrCode = 'ScanQrCode',
  CreateANewWallet = 'CreateANewWallet',
  WordsAmountSelector = 'WordsAmountSelector',
  VerifyMnemonic = 'VerifyMnemonic',
  AlmostDone = 'AlmostDone',
  WalletCreated = 'WalletCreated',
  Activity = 'Activity',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Token = 'Token',
  CollectiblesList = 'CollectiblesList',
  SpecificCollectiblesList = 'SpecificCollectiblesList',
  NetworkChangeConfirmation = 'NetworkChangeConfirmation',
  ChangePassword = 'ChangePassword',
  AuthorizedDApps = 'AuthorizedDApps',
  DeleteDApp = 'DeleteDApp',
  AddNewCollectible = 'AddNewCollectible',
  Collectible = 'Collectible',
  Welcome = 'Welcome',
  DAppTransactionConfirmation = 'DAppTransactionConfirmation',
  DAppSignConfirmation = 'DAppSignConfirmation',
  Swap = 'Swap',
  SwapRoute = 'SwapRoute',
  SlippageTolerance = 'SlippageTolerance',
  SwapConfirmation = 'SwapConfirmation',
  EditPermission = 'EditPermission',
  ConfirmAccess = 'ConfirmAccess'
}

type SensitiveScreensEnum = ScreensEnum.RevealPrivateKey | ScreensEnum.RevealSeedPhrase;

export type ScreensParamList = {
  [ScreensEnum.ImportWallet]?: { wordsAmount: SeedWordsAmount };
  [ScreensEnum.ManageTokens]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.SendToken]?: SendParams;
  [ScreensEnum.SendCollectible]?: SendParams;
  [ScreensEnum.TokensSelector]: { token?: Token; navigationKey: string };
  [ScreensEnum.SendCollectiblesSelector]: { token?: Token };
  [ScreensEnum.SendAccountsSelector]: { account: AccountInterface };
  [ScreensEnum.SendConfirmation]: { transferParams: TransferParams };
  [ScreensEnum.Settings]: undefined;
  [ScreensEnum.AccountsSettings]: undefined;
  [ScreensEnum.RevealPrivateKey]: { publicKeyHash: string };
  [ScreensEnum.RevealSeedPhrase]: undefined;
  [ScreensEnum.SettingsGeneral]: undefined;
  [ScreensEnum.SettingsCurrencySelector]: undefined;
  [ScreensEnum.SettingsAppearanceSelector]: undefined;
  [ScreensEnum.SettingsSecurity]: undefined;
  [ScreensEnum.SettingsLockTimeSelector]: undefined;
  [ScreensEnum.SettingsAboutUs]: undefined;
  [ScreensEnum.SettingsResetWalletConfirm]: undefined;
  [ScreensEnum.Wallet]: undefined;
  [ScreensEnum.ConnectToDapps]: undefined;
  [ScreensEnum.Unlock]: undefined;
  [ScreensEnum.AccountsSelector]: undefined;
  [ScreensEnum.NetworksSelector]: undefined;
  [ScreensEnum.EditAccount]: { publicKeyHash: string };
  [ScreensEnum.EditAccountName]: { account: AccountInterface };
  [ScreensEnum.AddAccount]?: { wordsAmount?: SeedWordsAmount; activeId?: number };
  [ScreensEnum.AddNetwork]: undefined;
  [ScreensEnum.AddNewToken]: undefined;
  [ScreensEnum.EditToken]: { token: Token };
  [ScreensEnum.EditNetwork]: { network: NetworkInterface; isNetworkSelected: boolean };
  [ScreensEnum.Tokens]: undefined;
  [ScreensEnum.DAppConnectionConfirmation]: { messageId: string; dAppInfo: DAppInfo };
  [ScreensEnum.ScanQrCode]: undefined;
  [ScreensEnum.CreateANewWallet]?: { wordsAmount: SeedWordsAmount };
  [ScreensEnum.WordsAmountSelector]?: { wordsAmount: SeedWordsAmount };
  [ScreensEnum.VerifyMnemonic]: { mnemonic: string[] };
  [ScreensEnum.AlmostDone]: { mnemonic: string; currentStep: number; stepsAmount: number };
  [ScreensEnum.WalletCreated]: undefined;
  [ScreensEnum.Activity]?: { filterType: Option<ActivityFilterEnum> };
  [ScreensEnum.ActivityFilterSelector]: { filterType: Option<ActivityFilterEnum> };
  [ScreensEnum.Token]: { tokenAddress: string; tokenId?: string };
  [ScreensEnum.CollectiblesList]: undefined;
  [ScreensEnum.CollectiblesList]: undefined;
  [ScreensEnum.NetworkChangeConfirmation]: { dAppOrigin: string; messageId: string; requestedChainId: string };
  [ScreensEnum.SpecificCollectiblesList]: { collectionName: string };
  [ScreensEnum.AddNewCollectible]: undefined;
  [ScreensEnum.Collectible]: { collectible: Token };
  [ScreensEnum.ChangePassword]: undefined;
  [ScreensEnum.AuthorizedDApps]: undefined;
  [ScreensEnum.DeleteDApp]: { origin: string };
  [ScreensEnum.Welcome]: undefined;
  [ScreensEnum.DAppTransactionConfirmation]: {
    messageId: string;
    transactionInfo: DAppTransactionInfo;
    dAppInfo: DAppInfo;
  };
  [ScreensEnum.DAppSignConfirmation]: { messageId: string; signInfo: string[]; dAppInfo: DAppInfo; method: string };
  [ScreensEnum.Swap]?: { fromToken?: Token; toToken?: Token };
  [ScreensEnum.SlippageTolerance]: undefined;
  [ScreensEnum.SwapRoute]: { routes: GetQuoteResponse['protocols']; fromToken: Token; toToken: Token };
  [ScreensEnum.EditPermission]: {
    origin: string;
    token: Token;
    proposedAllowanceAmount: string;
    customAllowanceAmount: string;
    spender: string;
  };
  [ScreensEnum.ConfirmAccess]: {
    destination: {
      screen: SensitiveScreensEnum;
      options?: { publicKeyHash: string };
    };
    submitButtonText: string;
    descriptionText: string;
  };
};

export const walletStackScreens = [
  ScreensEnum.Wallet,
  ScreensEnum.Activity,
  ScreensEnum.Tokens,
  ScreensEnum.ManageTokens,
  ScreensEnum.CollectiblesList,
  ScreensEnum.SpecificCollectiblesList
];
export const receiveStackScreens = [ScreensEnum.Receive];
export const swapStackScreens = [ScreensEnum.Swap];
export const sendStackScreens = [
  ScreensEnum.SendToken,
  ScreensEnum.TokensSelector,
  ScreensEnum.SendConfirmation,
  ScreensEnum.AccountsSelector
];
export const settingsStackScreens = [
  ScreensEnum.Settings,
  ScreensEnum.SettingsGeneral,
  ScreensEnum.SettingsSecurity,
  ScreensEnum.Settings,
  ScreensEnum.SettingsGeneral,
  ScreensEnum.SettingsSecurity,
  ScreensEnum.SettingsAboutUs,
  ScreensEnum.AccountsSettings,
  ScreensEnum.AuthorizedDApps,
  ScreensEnum.RevealPrivateKey,
  ScreensEnum.RevealSeedPhrase
];
