export enum ScreensEnum {
  AddNewToken = 'AddNewToken',
  ImportAccount = 'ImportAccount',
  ManageTokens = 'ManageTokens',
  Receive = 'Receive',
  Send = 'Send',
  Settings = 'Settings',
  Wallet = 'Wallet',
  AddNetwork = 'AddNetwork',
  ConnectToDapps = 'ConnectToDapps'
}

export type ScreensParamList = {
  [ScreensEnum.AddNewToken]: undefined;
  [ScreensEnum.ImportAccount]: undefined;
  [ScreensEnum.ManageTokens]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.Send]: undefined;
  [ScreensEnum.Settings]: undefined;
  [ScreensEnum.Wallet]: undefined;
  [ScreensEnum.AddNetwork]: undefined;
  [ScreensEnum.ConnectToDapps]: undefined;
};
