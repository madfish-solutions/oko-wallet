import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Shelter } from '../shelter/shelter';

export const useUnlock = () => {
  const [isLocked, setIsLocked] = useState(() => Shelter.getIsLocked());
  const [unlockError, setUnlockError] = useState<string>();

  const unlock$ = useMemo(() => new Subject<string>(), []);

  const unlock = useCallback((password: string) => unlock$.next(password), [unlock$]);

  const lock = useCallback(() => Shelter.lockApp(), []);

  useEffect(() => {
    const subscriptions = [
      Shelter.isLocked$.subscribe(value => setIsLocked(value)),
      unlock$.pipe(switchMap(password => Shelter.unlockApp$(password))).subscribe(result => {
        result ? setIsLocked(false) : setUnlockError('Wrong password. Try again');
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [unlock$]);

  return {
    isLocked,
    unlock,
    lock,
    unlockError,
    setUnlockError
  };
};
