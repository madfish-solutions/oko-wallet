import { useEffect } from 'react';

import { Shelter } from '../../shelter/shelter';
import { BackgroundMessager } from '../background-messager';

export const useBackgroundMessager = () => {
  useEffect(() => {
    BackgroundMessager.getPasswordHash().then(passwordHash => Shelter._passwordHash$.next(passwordHash));
    const subscription = Shelter._passwordHash$.subscribe(passwordHash =>
      BackgroundMessager.setPasswordHash(passwordHash)
    );

    return () => subscription.unsubscribe();
  }, []);
};
