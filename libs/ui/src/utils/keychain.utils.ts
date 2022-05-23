import { of } from 'rxjs';

export const resetStore$ = () => {
  localStorage.clear();

  return of(0);
};
