import { useNavigation as useUntypedNavigation, NavigationProp } from '@react-navigation/native';
import {ScreensParamList} from "../enums/sreens.enum";

export const useNavigation = () => useUntypedNavigation<NavigationProp<ScreensParamList>>();
