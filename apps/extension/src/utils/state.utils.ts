import { isDefined } from '@rnw-community/shared';
import { RootState, LocalStorage, initialRootState } from 'ui/background-script';

export const getState = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state: Record<string, any> = {};

  const serializedState: string | undefined = await LocalStorage.getItem('persist:root');

  if (!isDefined(serializedState)) {
    return initialRootState;
  }

  const rawState: Record<string, string> = JSON.parse(serializedState);

  Object.keys(rawState).forEach(key => {
    state[key] = JSON.parse(rawState[key]);
  });

  return state as RootState;
};
