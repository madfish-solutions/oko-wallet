import { useSelector } from 'react-redux';

import { AppInfoRootState, AppInfoState } from './app-info.state';

export const useIsUnlockedSelector = () =>
  useSelector<AppInfoRootState, AppInfoState['isUnlocked']>(({ appInfo }) => appInfo.isUnlocked);
