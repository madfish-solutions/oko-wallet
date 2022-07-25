import { isDefined } from '@rnw-community/shared';

import { MEMOIZE_UNLOCKED_STATE, ONE_MINUTE } from '../constants/defaults';

import { isMobile, isWeb } from './platform.utils';

const LOCK_TIME = 'locktime';

export const getUnlockedAppState = (defaulValue: boolean) => {
  if (isMobile) {
    return defaulValue;
  }

  const timelock: number | null = JSON.parse(localStorage.getItem(LOCK_TIME) as string);

  if (isDefined(timelock) && timelock > 0) {
    const timeIsLeft = Date.now() > ONE_MINUTE * MEMOIZE_UNLOCKED_STATE + +timelock;

    return timeIsLeft;
  }

  return defaulValue;
};

export const setLocktimeAppValue = (value = Date.now()) =>
  isWeb && localStorage.setItem(LOCK_TIME, JSON.stringify(value));
