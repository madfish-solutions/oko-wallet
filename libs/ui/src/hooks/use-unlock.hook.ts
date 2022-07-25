import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Shelter } from '../shelter/shelter';
import { getUnlockedAppState, setLocktimeAppValue } from '../utils/unlock-app-state';

export const useUnlock = () => {
  const [isLocked, setIsLocked] = useState(() => getUnlockedAppState(Shelter.getIsLocked()));

  const unlock$ = useMemo(() => new Subject<string>(), []);

  const unlock = useCallback((password: string) => unlock$.next(password), [unlock$]);

  const lock = useCallback(() => {
    setLocktimeAppValue(0);
    Shelter.lockApp();
  }, []);

  useEffect(() => {
    const subscriptions = [
      Shelter.isLocked$.subscribe(value => setIsLocked(value)),
      unlock$.pipe(switchMap(password => Shelter.unlockApp$(password))).subscribe(result => {
        if (result) {
          setIsLocked(false);
        }
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [unlock$]);

  return {
    isLocked,
    unlock,
    lock
  };
};
