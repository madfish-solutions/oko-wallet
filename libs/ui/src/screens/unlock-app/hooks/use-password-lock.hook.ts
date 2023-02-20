import { useEffect, useState } from 'react';

import { wrongPasswordError } from '../../../constants/form-errors';
import {
  INITIAL_ENTER_WRONG_PASSWORD_ATTEMPTS,
  MAX_PASSWORD_ATTEMPTS,
  WRONG_PASSWORD_LOCK_TIME
} from '../../../constants/security';
import {
  usePasswordLockTimeSelector,
  usePasswordWrongAttemptsSelector
} from '../../../store/security/security-selectors';
import { getTimeLeft } from '../utils/password.util';

export const usePasswordLock = (isFormSubmitted: boolean) => {
  const passwordLockTime = usePasswordLockTimeSelector();
  const passwordWrongAttempts = usePasswordWrongAttemptsSelector();
  const disableDuration = WRONG_PASSWORD_LOCK_TIME * Math.floor(passwordWrongAttempts / MAX_PASSWORD_ATTEMPTS);
  const [error, setError] = useState<string>();
  const isDisabled = Date.now() - passwordLockTime <= disableDuration;

  const onPasswordChange = () => !isDisabled && setError(undefined);

  useEffect(
    () =>
      void (
        isFormSubmitted &&
        passwordWrongAttempts > INITIAL_ENTER_WRONG_PASSWORD_ATTEMPTS &&
        passwordWrongAttempts < MAX_PASSWORD_ATTEMPTS &&
        setError(wrongPasswordError)
      ),
    [passwordWrongAttempts, isFormSubmitted]
  );

  useEffect(() => {
    if (isDisabled) {
      const errorHandler = () => {
        const newError =
          Date.now() - passwordLockTime <= disableDuration
            ? `${wrongPasswordError} in ${getTimeLeft(passwordLockTime, disableDuration)}`
            : wrongPasswordError;
        setError(newError);
      };

      errorHandler();

      const intervalId = setInterval(() => {
        if (Date.now() - passwordLockTime >= disableDuration) {
          clearInterval(intervalId);
        }

        errorHandler();
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [passwordLockTime, disableDuration, isDisabled]);

  return { isDisabled, error, onPasswordChange };
};
