import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Shelter } from '../shelter/shelter';
import { setLocktimeAppValue } from '../utils/unlock-app-state';

export const useUnlock = () => {
  const [isLocked, setIsLocked] = useState(() => Shelter.getIsLocked());

  const password$ = useMemo(() => new Subject<string>(), []);

  const unlock = useCallback((password: string) => password$.next(password), [password$]);

  const lock = useCallback(() => {
    setLocktimeAppValue(0);
    Shelter.lockApp();
  }, []);

  useEffect(() => {
    const subscriptions = [
      Shelter.isLocked$.subscribe(value => setIsLocked(value)),
      password$.pipe(switchMap(password => Shelter.unlockApp$(password))).subscribe(result => {
        if (result) {
          setIsLocked(false);
        }
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [password$]);

  return {
    isLocked,
    unlock,
    lock
  };
};
