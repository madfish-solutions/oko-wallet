import { useNavigationState } from '@react-navigation/native';

import { ScreensEnum } from '../enums/sreens.enum';

export const usePreviousScreenName = () => {
  const routes = useNavigationState(state => state.routes);

  return routes[routes.length - 2].name as ScreensEnum;
};
