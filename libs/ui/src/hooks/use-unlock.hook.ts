import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Subject, of, interval } from 'rxjs';
import { switchMap, tap, delayWhen } from 'rxjs/operators';
import { Shelter } from 'shelter';

import { MAX_PASSWORD_ATTEMPTS } from '../constants/security';
import { enterPassword } from '../store/security/security-actions';
import { usePasswordWrongAttemptsSelector } from '../store/security/security-selectors';
import { hideLoaderAction, showLoaderAction } from '../store/settings/settings.actions';
import { getRandomDelay } from '../utils/get-random-value.util';

export const useUnlock = () => {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(() => Shelter.getIsLocked());
  const passwordWrongAttempts = usePasswordWrongAttemptsSelector();

  const unlock$ = useMemo(() => new Subject<{ password: string; passwordWrongAttempts: number }>(), []);

  const unlock = useCallback(
    (password: string) => unlock$.next({ password, passwordWrongAttempts }),
    [unlock$, passwordWrongAttempts]
  );

  const lock = useCallback(() => Shelter.lockApp(), []);

  useEffect(() => {
    const subscriptions = [
      Shelter.isLocked$.subscribe(value => setIsLocked(value)),
      unlock$
        .pipe(
          tap(() => dispatch(showLoaderAction())),
          delayWhen(unlockArgs =>
            unlockArgs.passwordWrongAttempts >= MAX_PASSWORD_ATTEMPTS
              ? interval(getRandomDelay(unlockArgs.passwordWrongAttempts))
              : of(undefined)
          ),
          switchMap(unlockArgs => Shelter.unlockApp$(unlockArgs.password)),
          tap(() => dispatch(hideLoaderAction()))
        )
        .subscribe(result => {
          if (result) {
            setIsLocked(false);

            dispatch(enterPassword.success());
          } else {
            dispatch(enterPassword.fail());
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
