import { AccountInterface } from '../interfaces/account.interface';
import { NetworkInterface } from '../interfaces/network.interface';
import { Token } from '../interfaces/token.interface';
import { TransferParams } from '../interfaces/transfer-params.interface';

export enum ScreensEnum {
  ImportAccount = 'ImportAccount',
  ManageTokens = 'ManageTokens',
  Receive = 'Receive',
  Send = 'Send',
  SendTokensSelector = 'SendTokensSelector',
  SendAccountsSelector = 'SendAccountsSelector',
  SendConfirmation = 'SendConfirmation',
  Settings = 'Settings',
  Wallet = 'Wallet',
  ConnectToDapps = 'ConnectToDapps',
  Unlock = 'unlock',
  AccountsSelector = 'AccountsSelector',
  NetworksSelector = 'NetworksSelector',
  EditAccount = 'EditAccount',
  AddAccount = 'AddAccount',
  AddNetwork = 'AddNetwork',
  EditNetwork = 'EditNetwork',
  AddNewToken = 'AddNewToken',
  EditToken = 'EditToken',
  Tokens = 'Tokens',
  ScanQrCode = 'ScanQrCode',
  Activity = 'Activity',
  Token = 'Token'
}

export type ScreensParamList = {
  [ScreensEnum.ImportAccount]: undefined;
  [ScreensEnum.ManageTokens]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.Send]?: { account?: AccountInterface; token?: Token; receiverPublicKeyHash?: string };
  [ScreensEnum.SendTokensSelector]: { token: Token };
  [ScreensEnum.SendAccountsSelector]: { account: AccountInterface };
  [ScreensEnum.SendConfirmation]: {
    transferParams: TransferParams;
  };
  [ScreensEnum.Settings]: undefined;
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
  [ScreensEnum.ScanQrCode]: undefined;
  [ScreensEnum.Activity]: undefined;
  [ScreensEnum.Token]: { token: Token };
  [ScreensEnum.Activity]: undefined;
};
