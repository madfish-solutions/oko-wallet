import { useEffect, useState } from 'react';

import { wrongPasswordError } from '../../../constants/form-errors';
import { MAX_PASSWORD_ATTEMPTS, WRONG_PASSWORD_LOCK_TIME } from '../../../constants/security';
import {
  usePasswordLockTimeSelector,
  usePasswordWrongAttemptsSelector
} from '../../../store/security/security-selectors';
import { getTimeLeft } from '../utils/password.util';

export const usePasswordLock = (isFormSubmitted: boolean) => {
  const passwordLockTime = usePasswordLockTimeSelector();
  const passwordWrongAttempts = usePasswordWrongAttemptsSelector();
  const lockLevel = WRONG_PASSWORD_LOCK_TIME * Math.floor(passwordWrongAttempts / MAX_PASSWORD_ATTEMPTS);
  const [error, setError] = useState<string>();
  const isDisabled = Date.now() - passwordLockTime <= lockLevel;

  const onPasswordChange = () => !isDisabled && setError(undefined);

  useEffect(
    () =>
      void (
        isFormSubmitted &&
        (passwordWrongAttempts === 1 || passwordWrongAttempts === 2) &&
        setError(wrongPasswordError)
      ),
    [passwordWrongAttempts, isFormSubmitted]
  );

  useEffect(() => {
    if (isDisabled) {
      const errorHandler = () => {
        const newError =
          Date.now() - passwordLockTime <= lockLevel
            ? `${wrongPasswordError} in ${getTimeLeft(passwordLockTime, lockLevel)}`
            : wrongPasswordError;
        setError(newError);
      };

      errorHandler();

      const intervalId = setInterval(() => {
        if (Date.now() - passwordLockTime >= lockLevel) {
          clearInterval(intervalId);
        }

        errorHandler();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [passwordLockTime, lockLevel, isDisabled]);

  return { isDisabled, error, onPasswordChange };
};
