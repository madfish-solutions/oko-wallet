import { useSelector } from 'react-redux';

import { AppInfoRootState, AppInfoState } from './app-info.state';

export const useRandomBalanceSelector = () =>
  useSelector<AppInfoRootState, AppInfoState['randomBalance']>(({ appInfo }) => appInfo.randomBalance);
