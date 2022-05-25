import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject, switchMap } from 'rxjs';

import { Shelter } from '../shelter/shelter';

export const useUnlock = () => {
  const [isLocked, setIsLocked] = useState(() => Shelter.getIsLocked());

  const unlock$ = useMemo(() => new Subject<string>(), []);

  const unlock = useCallback((password: string) => unlock$.next(password), [unlock$]);

  const lock = useCallback(() => Shelter.lockApp(), []);

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
