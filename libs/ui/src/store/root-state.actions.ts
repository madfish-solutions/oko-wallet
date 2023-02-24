import { ParamListBase } from '@react-navigation/native';
import { createAction } from '@reduxjs/toolkit';

import { ScreensParamList } from '../enums/sreens.enum';

import { createActions } from './utils/action.utils';

type NavigationArgsType<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList
> = undefined extends ParamList[RouteName]
  ? [RouteName] | [RouteName, ParamList[RouteName]]
  : [RouteName, ParamList[RouteName]];

export const resetApplicationAction = createActions('root/RESET_APPLICATION');
export const resetKeychainOnInstallAction = createActions('root/RESET_KEYCHAIN_ON_INSTALL');

export const untypedNavigateAction =
  createAction<NavigationArgsType<ScreensParamList, keyof ScreensParamList>>('navigation/NAVIGATE');
export const navigateAction = <RouteName extends keyof ScreensParamList>(
  ...navigationArgs: NavigationArgsType<ScreensParamList, RouteName>
) => createAction<NavigationArgsType<ScreensParamList, RouteName>>('navigation/NAVIGATE')(navigationArgs);
