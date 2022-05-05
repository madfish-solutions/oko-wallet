export enum ScreensEnum {
  Wallet = 'Wallet',
  Settings = 'Settings',
  AddNetwork = 'Add network'
}

export type ScreensParamList = {
  [ScreensEnum.Wallet]: undefined;
  [ScreensEnum.Settings]: undefined;
  [ScreensEnum.AddNetwork]: undefined;
};
