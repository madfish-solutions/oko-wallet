import { Route } from '@react-navigation/native';

import { ScreensEnum, ScreensParamList } from '../enums/sreens.enum';

export const createNavigationRoute = <T extends ScreensEnum>(
  name: T,
  params: ScreensParamList[T]
): Omit<Route<T>, 'key'> => ({
  name,
  params
});
