import { isDefined } from '@rnw-community/shared';

import { MEMOIZE_UNLOCKED_STATE, ONE_MINUTE } from '../constants/defaults';

import { isMobile, isWeb } from './platform.utils';

const LOCK_TIME = 'locktime';

export const getUnlockedAppState = (defaultValue: boolean) => {
  if (isMobile) {
    return defaultValue;
  }

  const locktime: number | null = JSON.parse(localStorage.getItem(LOCK_TIME) as string);

  if (isDefined(locktime) && locktime > 0) {
    const timeIsLeft = Date.now() > ONE_MINUTE * MEMOIZE_UNLOCKED_STATE + locktime;

    if (timeIsLeft) {
      setLocktimeAppValue(0);
    }

    return timeIsLeft;
  }

  return defaultValue;
};

export const setLocktimeAppValue = (value = Date.now()) =>
  isWeb && localStorage.setItem(LOCK_TIME, JSON.stringify(value));
