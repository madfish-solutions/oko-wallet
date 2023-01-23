import { isDefined } from '@rnw-community/shared';
import { INITIAL_PASSWORD_HASH } from 'ui/background-script';

import { LAST_USER_ACTIVITY_TIMESTAMP_KEY, LOCK_TIME_PERIOD_KEY, PASSWORD_HASH_KEY } from '../constants/storage-keys';

import { browserWithSession as browser } from './browser.utils';

export const convertLockTime = (value: number) => value * 60 * 1000;

export async function getFromStorage<T>(key: string): Promise<T | null> {
  if (!isDefined(browser.storage.session)) {
    return null;
  }

  const items = await browser.storage.session.get([key]);
  if (key in items) {
    return items[key];
  }

  return null;
}

export async function setToStorage<T>(item: Record<string, T>) {
  if (!isDefined(browser.storage.session)) {
    return null;
  }

  return browser.storage.session.set(item);
}

export const getSessionPasswordHash = async (isFullpageOpen: boolean) => {
  const passwordHash: string | null = await getFromStorage(PASSWORD_HASH_KEY);
  const lastUserActivity: number | null = await getFromStorage(LAST_USER_ACTIVITY_TIMESTAMP_KEY);
  const lockTimePeriod: number | null = await getFromStorage(LOCK_TIME_PERIOD_KEY);

  if (passwordHash === null || lastUserActivity === null) {
    return Promise.resolve('');
  }

  const isTimeExpired =
    Date.now() > lastUserActivity + convertLockTime(lockTimePeriod ?? 1) &&
    !isFullpageOpen &&
    passwordHash !== null &&
    passwordHash.length > 0;

  if (isTimeExpired) {
    setToStorage({ [PASSWORD_HASH_KEY]: INITIAL_PASSWORD_HASH, [LAST_USER_ACTIVITY_TIMESTAMP_KEY]: 0 });

    return Promise.resolve('');
  }

  return Promise.resolve(passwordHash);
};
