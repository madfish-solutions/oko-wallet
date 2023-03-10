import { useCallback, useEffect, useMemo, useState } from 'react';
import { Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Shelter } from 'shelter';

export const useConfirmAccess = () => {
  const [isLocked, setIsLocked] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  const unlock$ = useMemo(() => new Subject<{ password: string }>(), []);

  const unlock = useCallback((password: string) => unlock$.next({ password }), [unlock$]);

  useEffect(() => {
    const subscriptions = [
      unlock$.pipe(switchMap(unlockArgs => Shelter.unlockApp$(unlockArgs.password))).subscribe(result => {
        if (result) {
          setIsLocked(false);
        } else {
          setErrorMessage('Invalid password');
        }
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, [unlock$]);

  return {
    isLocked,
    unlock,
    setErrorMessage,
    errorMessage
  };
};
