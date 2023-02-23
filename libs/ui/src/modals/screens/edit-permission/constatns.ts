import { isNotEmptyString } from '@rnw-community/shared';

import { requiredFieldError } from '../../../constants/form-errors';

import { FormTypes } from './types';

export const ALLOWANCE_RULES = {
  validate: (value: string, formValues: FormTypes) => {
    if (!formValues.isCustomAllowanceSelected) {
      return true;
    }

    return isNotEmptyString(value) || requiredFieldError;
  }
};

export const INFINITE_AMOUNT = 'Aprx. inf';
