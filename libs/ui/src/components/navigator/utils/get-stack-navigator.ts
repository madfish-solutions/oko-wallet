import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ScreensParamList } from '../../../enums/screens.enum';

export const Stack = createNativeStackNavigator<ScreensParamList>();
