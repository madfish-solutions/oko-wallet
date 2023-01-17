import { useNavigationState } from '@react-navigation/native';

import { ScreensEnum } from '../enums/sreens.enum';

export const useCurrentRoute = () =>
  useNavigationState(state => state.routes[state.routes.length - 1].name as ScreensEnum);
