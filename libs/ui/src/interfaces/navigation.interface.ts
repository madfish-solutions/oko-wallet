import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ScreensParamList } from '../enums/sreens.enum';

export type NavigationProps<ScreenParam extends keyof ScreensParamList> = NativeStackScreenProps<
  ScreensParamList,
  ScreenParam
>;
