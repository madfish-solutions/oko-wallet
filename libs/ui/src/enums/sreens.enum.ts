import { SeedWordsAmount } from '../constants/seed-words-amount';
import { AccountInterface } from '../interfaces/account.interface';
import { NetworkInterface } from '../interfaces/network.interface';
import { Token } from '../interfaces/token.interface';
import { TransferParams } from '../interfaces/transfer-params.interface';

export enum ScreensEnum {
  ImportWallet = 'ImportWallet',
  Authorization = 'Authorization',
  ManageTokens = 'ManageTokens',
  Receive = 'Receive',
  Send = 'Send',
  SendTokensSelector = 'SendTokensSelector',
  SendAccountsSelector = 'SendAccountsSelector',
  SendConfirmation = 'SendConfirmation',
  Settings = 'Settings',
  AccountsSettings = 'AccountsSettings',
  RevealPrivateKey = 'RevealPrivateKey',
  RevealSeedPhrase = 'RevealSeedPhrase',
  SettingsGeneral = 'SettingsGeneral',
  SettingsCurrencySelector = 'SettingsCurrencySelector',
  SettingsAppearanceSelector = 'SettingsAppearanceSelector',
  SettingsSecurity = 'SettingsSecurity',
  SettingsLockTimeSelector = 'SettingsLockTimeSelector',
  SettingsAboutUs = 'SettingsAboutUs',
  SettingsResetWalletConfirm = 'SettingsResetWalletConfirm',
  Wallet = 'Wallet',
  ConnectToDapps = 'ConnectToDapps',
  Unlock = 'unlock',
  AccountsSelector = 'AccountsSelector',
  NetworksSelector = 'NetworksSelector',
  EditAccount = 'EditAccount',
  AddAccount = 'AddAccount',
  AddNetwork = 'AddNetwork',
  EditNetwork = 'EditNetwork',
  DappConfirmation = 'DappConfirmation',
  AddNewToken = 'AddNewToken',
  EditToken = 'EditToken',
  Tokens = 'Tokens',
  ScanQrCode = 'ScanQrCode',
  CreateANewWallet = 'CreateANewWallet',
  WordsAmountSelector = 'WordsAmountSelector',
  VerifyMnemonic = 'VerifyMnemonic',
  AlmostDone = 'AlmostDone',
  Activity = 'Activity',
  Token = 'Token',
  CollectiblesList = 'CollectiblesList',
  SpecificCollectiblesList = 'SpecificCollectiblesList',
  ChangePassword = 'ChangePassword',
  AuthorizedDapps = 'AuthorizedDapps',
  DeleteDapp = 'DeleteDapp',
  AddNewCollectible = 'AddNewCollectible',
  Collectible = 'Collectible'
}

export type ScreensParamList = {
  [ScreensEnum.ImportWallet]?: { wordsAmount: SeedWordsAmount };
  [ScreensEnum.Authorization]: undefined;
  [ScreensEnum.ManageTokens]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.Send]?: { account?: AccountInterface; token?: Token; receiverPublicKeyHash?: string };
  [ScreensEnum.SendTokensSelector]: { token: Token };
  [ScreensEnum.SendAccountsSelector]: { account: AccountInterface };
  [ScreensEnum.SendConfirmation]: {
    transferParams: TransferParams;
  };
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
  [ScreensEnum.EditAccount]: { account: AccountInterface };
  [ScreensEnum.AddAccount]: undefined;
  [ScreensEnum.AddNetwork]: undefined;
  [ScreensEnum.AddNewToken]: undefined;
  [ScreensEnum.EditToken]: { token: Token };
  [ScreensEnum.EditNetwork]: { network: NetworkInterface; isNetworkSelected: boolean };
  [ScreensEnum.Tokens]: undefined;
  [ScreensEnum.DappConfirmation]: { dappName: string; id: string };
  [ScreensEnum.ScanQrCode]: undefined;
  [ScreensEnum.CreateANewWallet]?: { wordsAmount: SeedWordsAmount };
  [ScreensEnum.WordsAmountSelector]?: { wordsAmount: SeedWordsAmount };
  [ScreensEnum.VerifyMnemonic]: { mnemonic: string[] };
  [ScreensEnum.AlmostDone]: { mnemonic: string; currentStep: number; stepsAmount: number };
  [ScreensEnum.Activity]: undefined;
  [ScreensEnum.Token]: { token: Token };
  [ScreensEnum.CollectiblesList]: undefined;
  [ScreensEnum.CollectiblesList]: undefined;
  [ScreensEnum.SpecificCollectiblesList]: { collectionName: string };
  [ScreensEnum.AddNewCollectible]: undefined;
  [ScreensEnum.Collectible]: { collectible: Token };
  [ScreensEnum.ChangePassword]: undefined;
  [ScreensEnum.AuthorizedDapps]: undefined;
  [ScreensEnum.DeleteDapp]: { dappName: string };
};
