export enum ScreensEnum {
  Welcome = 'Welcome',
  Test = 'Test',
  Inner = 'Inner'
}

export type ScreensParamList = {
  [ScreensEnum.Welcome]: undefined;
  [ScreensEnum.Test]: undefined;
  [ScreensEnum.Inner]: undefined;
};
