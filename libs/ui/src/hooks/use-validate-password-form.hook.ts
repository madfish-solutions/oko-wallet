import { useEffect } from 'react';
import { UseFormTrigger } from 'react-hook-form/dist/types/form';

import { requiredFieldError } from '../constants/form-errors';

import { useValidateForm } from './use-validate-form.hook';

interface UseValidatePasswordFormArgs<FormFields extends { confirmPassword: string }> {
  password: string;
  confirmPassword: string;
  confirmPasswordError?: string;
  trigger: UseFormTrigger<FormFields>;
}

const PASSWORD_DOES_NOT_MATCH = "Password doesn't match";

export const useValidatePasswordForm = <FormFields extends { confirmPassword: string }>({
  password,
  confirmPassword,
  confirmPasswordError,
  trigger
}: UseValidatePasswordFormArgs<FormFields>) => {
  const { commonRules } = useValidateForm();

  const matchPassword = (currentValue: string) => {
    if (currentValue !== password) {
      return PASSWORD_DOES_NOT_MATCH;
    }
  };

  const confirmPasswordRules = {
    required: requiredFieldError,
    validate: { ...commonRules.validate, matchPassword }
  };

  const changePasswordRules = {
    required: requiredFieldError,
    validate: { ...commonRules.validate, matchPassword }
  };

  useEffect(() => {
    if (confirmPasswordError === PASSWORD_DOES_NOT_MATCH && password === confirmPassword) {
      // @ts-ignore
      trigger('confirmPassword');
    }
  }, [confirmPasswordError, password, confirmPassword]);

  return {
    commonRules,
    confirmPasswordRules,
    changePasswordRules
  };
};
