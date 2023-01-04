import { INITIAL_PASSWORD_HASH } from '../../../../libs/ui/src/background-script';
import { LAST_USER_ACTIVITY_TIMESTAMP_KEY, LOCK_TIME_PERIOD_KEY, PASSWORD_HASH_KEY } from '../constants/storage-keys';

import { browserWithSession as browser } from './browser.utils';

export const convertLockTime = (value: number) => value * 60 * 1000;

export async function fetchFromStorage<T = any>(key: string): Promise<T | null> {
  if (!browser.storage.session) {
    return null;
  }

  const items = await browser.storage.session.get([key]);
  if (key in items) {
    return items[key];
  }

  return null;
}

export async function putToStorage<T = any>(item: Record<string, T>) {
  if (!browser.storage.session) {
    return null;
  }

  return browser.storage.session.set(item);
}

export const setSessionPaswordHash = (key: string, value: string) => {
  putToStorage({ [key]: value });

  return Promise.resolve();
};

export const getSessionPasswordHash = async (isFullpageOpen: boolean) => {
  const passwordHash: string | null = await fetchFromStorage(PASSWORD_HASH_KEY);
  const lastUserActivity = await fetchFromStorage(LAST_USER_ACTIVITY_TIMESTAMP_KEY);
  const lockTimePeriod: number | null = await fetchFromStorage(LOCK_TIME_PERIOD_KEY);

  if (
    Date.now() > lastUserActivity + convertLockTime(lockTimePeriod ?? 1) &&
    !isFullpageOpen &&
    passwordHash !== null &&
    passwordHash.length
  ) {
    putToStorage({ [PASSWORD_HASH_KEY]: INITIAL_PASSWORD_HASH, [LAST_USER_ACTIVITY_TIMESTAMP_KEY]: 0 });

    return Promise.resolve('');
  }

  return Promise.resolve(passwordHash);
};

export const setLockTimePeriod = (key: string, value: number) => {
  putToStorage({ [key]: value });

  return Promise.resolve();
};
