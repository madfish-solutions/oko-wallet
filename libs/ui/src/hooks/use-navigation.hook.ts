import { useNavigation as useUntypedNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreensParamList } from '../enums/screens.enum';

export const useNavigation = () => useUntypedNavigation<NativeStackNavigationProp<ScreensParamList>>();
