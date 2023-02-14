import { useEffect } from 'react';

import { Shelter } from '../../shelter';
import { BackgroundMessager } from '../background-messager';

export const useBackgroundMessager = () => {
  useEffect(() => {
    BackgroundMessager.getPasswordHash().then(passwordHash => Shelter._passwordHash$.next(passwordHash));
  }, []);
};
