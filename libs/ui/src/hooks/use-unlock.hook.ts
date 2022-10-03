import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Shelter } from '../shelter/shelter';

export const useUnlock = () => {
  const [isLocked, setIsLocked] = useState(() => Shelter.getIsLocked());
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const unlock$ = useMemo(() => new Subject<string>(), []);
  const changePassword$ = useMemo(() => new Subject<string[]>(), []);

  const unlock = useCallback((password: string) => unlock$.next(password), [unlock$]);

  const lock = useCallback(() => Shelter.lockApp(), []);

  const changePassword = (password: string, oldPassword: string) => changePassword$.next([password, oldPassword]);

  useEffect(() => {
    const subscriptions = [
      Shelter.isLocked$.subscribe(value => setIsLocked(value)),
      unlock$.pipe(switchMap(password => Shelter.unlockApp$(password))).subscribe(result => {
        if (result) {
          setIsLocked(false);
        }
      }),
      changePassword$
        .pipe(switchMap(([password, oldPassword]) => Shelter.changePassword$(password, oldPassword)))
        .subscribe(result => {
          if (result) {
            setIsPasswordMatch(true);
          }
        })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [unlock$]);

  return {
    isLocked,
    isPasswordMatch,
    unlock,
    lock,
    changePassword
  };
};
