import { useMemo, useRef } from 'react';

import { useLockTimePeriodSelector } from '../store/settings/settings.selectors';

import { useAppStateStatus } from './use-app-state-status.hook';
import { useUnlock } from './use-unlock.hook';

export const useAppLockTimer = () => {
  const changedToBackgroundStateMoment = useRef<Date>(new Date());
  const { lock } = useUnlock();
  const lockTimePeriod = useLockTimePeriodSelector();

  const showEnterPasswordScreenDelay = useMemo(() => lockTimePeriod * 60 * 1000, [lockTimePeriod]);

  useAppStateStatus({
    onAppActiveState: () => {
      if (new Date().getTime() - changedToBackgroundStateMoment.current.getTime() > showEnterPasswordScreenDelay) {
        lock();
      }
      changedToBackgroundStateMoment.current = new Date();
    },
    onAppBackgroundState: () => {
      changedToBackgroundStateMoment.current = new Date();
    }
  });
};
