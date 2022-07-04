import { TransferParams } from '../interfaces/transfer-params.interface';

export enum ScreensEnum {
  AddNetwork = 'AddNetwork',
  AddNewToken = 'AddNewToken',
  ImportAccount = 'ImportAccount',
  ManageTokens = 'ManageTokens',
  Receive = 'Receive',
  Send = 'Send',
  SendConfirmation = 'SendConfirmation',
  Settings = 'Settings',
  Wallet = 'Wallet',
  ConnectToDapps = 'ConnectToDapps',
  Unlock = 'unlock',
  Accounts = 'Accounts',
  AccountTokens = 'AccountTokens'
}

export type ScreensParamList = {
  [ScreensEnum.AddNetwork]: undefined;
  [ScreensEnum.AddNewToken]: undefined;
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
  [ScreensEnum.Accounts]: undefined;
  [ScreensEnum.AccountTokens]: undefined;
};
