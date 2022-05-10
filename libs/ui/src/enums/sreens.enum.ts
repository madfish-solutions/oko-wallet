export enum ScreensEnum {
  ImportAccount = 'ImportAccount',
  Receive = 'Receive',
  Send = 'Send',
  Settings = 'Settings',
  Wallet = 'Wallet',
  TokenList = 'TokenList',
}

export type ScreensParamList = {
  [ScreensEnum.ImportAccount]: undefined;
  [ScreensEnum.Receive]: undefined;
  [ScreensEnum.Send]: undefined;
  [ScreensEnum.Settings]: undefined;
  [ScreensEnum.Wallet]: undefined;
  [ScreensEnum.TokenList]: undefined;
};
