import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Subject, switchMap } from 'rxjs';

import { Shelter } from '../shelter/shelter';
import { unlockAppAction } from '../store/app-info/app-info.actions';

export const useUnlock = () => {
  const dispatch = useDispatch();

  const unlock$ = useMemo(() => new Subject<string>(), []);

  const unlock = useCallback((password: string) => unlock$.next(password), [unlock$]);

  const lock = useCallback(() => {
    Shelter.lockApp();
    dispatch(unlockAppAction(false));
  }, []);

  useEffect(() => {
    const subscription = unlock$.pipe(switchMap(password => Shelter.unlockApp$(password))).subscribe(result => {
      dispatch(unlockAppAction(result));
    });

    return () => subscription.unsubscribe();
  }, [dispatch, unlock$]);

  return {
    unlock,
    lock
  };
};
