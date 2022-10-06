import { of } from 'rxjs';

export const resetStore$ = () => {
  localStorage.clear();

  return of(0);
};

export const clearSensitiveData$ = (keys: string[]) => {
  keys.map(key => localStorage.removeItem(key));

  return of(0);
};
