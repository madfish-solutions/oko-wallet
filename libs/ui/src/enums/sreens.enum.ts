export enum ScreensEnum {
  Welcome = 'Welcome',
  GenerateHdAccount = 'Generate Hd Account',
  ImportAccount = 'ImportAccount',
  Receive = 'Receive',
  Send = 'Send',
  Settings = 'Settings',
  Wallet = 'Wallet'
}

export type ScreensParamList = {
  [ScreensEnum.Welcome]: undefined;
  [ScreensEnum.GenerateHdAccount]: undefined;
  [ScreensEnum.ImportAccount]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.Send]: undefined;
  [ScreensEnum.Settings]: undefined;
  [ScreensEnum.Wallet]: undefined;
};
