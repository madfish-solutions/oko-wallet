import { createReducer } from '@reduxjs/toolkit';

import {
  INITIAL_ENTER_PASSWORD_LOCK_TIME,
  INITIAL_ENTER_WRONG_PASSWORD_ATTEMPTS,
  MAX_PASSWORD_ATTEMPTS
} from '../../constants/security';

import { enterPassword } from './security-actions';
import { securityInitialState, SecurityState } from './security-state';

export const securityReducers = createReducer<SecurityState>(securityInitialState, builder => {
  builder
    .addCase(enterPassword.fail, state => {
      const passwordWrongAttempts = state.passwordWrongAttempts + 1;
      const passwordLockTime = passwordWrongAttempts >= MAX_PASSWORD_ATTEMPTS ? Date.now() : 0;

      return {
        ...state,
        passwordWrongAttempts,
        passwordLockTime
      };
    })
    .addCase(enterPassword.success, state => ({
      ...state,
      passwordWrongAttempts: INITIAL_ENTER_WRONG_PASSWORD_ATTEMPTS,
      passwordLockTime: INITIAL_ENTER_PASSWORD_LOCK_TIME
    }));
});
