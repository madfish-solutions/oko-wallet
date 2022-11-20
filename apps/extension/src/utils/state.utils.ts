import { RootState, LocalStorage } from 'ui/background-script';

export const getState = async () => {
  const state: Record<string, any> = {};

  const serializedState: string = await LocalStorage.getItem('persist:root');
  const rawState: Record<string, string> = JSON.parse(serializedState);

  Object.keys(rawState).forEach(key => {
    state[key] = JSON.parse(rawState[key]);
  });

  return state as RootState;
};
