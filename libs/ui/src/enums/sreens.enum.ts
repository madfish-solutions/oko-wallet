import { AccountInterface } from '../interfaces/account.interface';
import { NetworkInterface } from '../interfaces/network.interface';
import { TransferParams } from '../interfaces/transfer-params.interface';

export enum ScreensEnum {
  ImportAccount = 'ImportAccount',
  ManageTokens = 'ManageTokens',
  Receive = 'Receive',
  Send = 'Send',
  SendConfirmation = 'SendConfirmation',
  Settings = 'Settings',
  Wallet = 'Wallet',
  ConnectToDapps = 'ConnectToDapps',
  Unlock = 'unlock',
  AccountsSelector = 'AccountsSelector',
  AccountTokens = 'AccountTokens',
  NetworksSelector = 'NetworksSelector',
  EditAccount = 'EditAccount',
  AddAccount = 'AddAccount',
  AddNetwork = 'AddNetwork',
  EditNetwork = 'EditNetwork',
  AddNewToken = 'AddNewToken',
  EditToken = 'EditToken'
}

export type ScreensParamList = {
  [ScreensEnum.ImportAccount]: undefined;
  [ScreensEnum.ManageTokens]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.Send]: undefined;
  [ScreensEnum.SendConfirmation]: {
    transferParams: TransferParams;
  };
  [ScreensEnum.Settings]: undefined;
  [ScreensEnum.Wallet]: undefined;
  [ScreensEnum.ConnectToDapps]: undefined;
  [ScreensEnum.Unlock]: undefined;
  [ScreensEnum.AccountsSelector]: undefined;
  [ScreensEnum.AccountTokens]: undefined;
  [ScreensEnum.NetworksSelector]: undefined;
  [ScreensEnum.EditAccount]: { account: AccountInterface };
  [ScreensEnum.AddAccount]: undefined;
  [ScreensEnum.AddNetwork]: undefined;
  [ScreensEnum.AddNewToken]: undefined;
  [ScreensEnum.EditToken]: undefined;
  [ScreensEnum.EditNetwork]: { network: NetworkInterface; isNetworkSelected: boolean };
};
