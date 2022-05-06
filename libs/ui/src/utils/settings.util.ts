import { Observable, withLatestFrom } from 'rxjs';

import { SettingsRootState } from '../store/settings/settings.state';
import { NetworkType } from '../types/networks.type';

export const withSelectedNetwork =
  <T>(state$: Observable<SettingsRootState>) =>
  (observable$: Observable<T>) =>
    observable$.pipe(
      withLatestFrom(state$, (value, { settings }): [T, NetworkType] => {
        return [value, settings.networks[settings.selectedNetwork]];
      })
    );
