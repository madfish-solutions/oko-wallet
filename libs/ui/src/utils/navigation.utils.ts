import { Route } from '@react-navigation/native';

import { ScreensEnum, ScreensParamList } from '../enums/sreens.enum';

export const createNavigationRoute = <T extends ScreensEnum>(
  name: T,
  // @ts-ignore
  params: ScreensParamList[T]
): Omit<Route<T>, 'key'> => ({
  name,
  // @ts-ignore
  params
});
