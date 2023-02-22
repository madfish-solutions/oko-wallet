import { useSelector } from 'react-redux';

import { SecurityRootState } from './security-state';

export const usePasswordWrongAttemptsSelector = () =>
  useSelector<SecurityRootState, number>(({ security }) => security.passwordWrongAttempts);

export const usePasswordLockTimeSelector = () =>
  useSelector<SecurityRootState, number>(({ security }) => security.passwordLockTime);
