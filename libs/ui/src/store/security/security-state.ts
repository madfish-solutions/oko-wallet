import { INITIAL_ENTER_WRONG_PASSWORD_ATTEMPTS, INITIAL_ENTER_PASSWORD_LOCK_TIME } from '../../constants/security';

export interface SecurityState {
  passwordWrongAttempts: number;
  passwordLockTime: number;
}

export const securityInitialState: SecurityState = {
  passwordWrongAttempts: INITIAL_ENTER_WRONG_PASSWORD_ATTEMPTS,
  passwordLockTime: INITIAL_ENTER_PASSWORD_LOCK_TIME
};

export interface SecurityRootState {
  security: SecurityState;
}
