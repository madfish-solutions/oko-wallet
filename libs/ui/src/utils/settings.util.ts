import { Observable, withLatestFrom } from 'rxjs';

import { SettingsRootState } from '../store/settings/settings.state';

export const withSelectedNetwork =
  <T>(state$: Observable<SettingsRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(withLatestFrom(state$, (value, { settings }): [T, string] => [value, settings.network]));
