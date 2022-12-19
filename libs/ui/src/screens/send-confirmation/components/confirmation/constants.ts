import { requiredFieldError } from '../../../../constants/form-errors';

import { SpeedEnum } from './enums';

export interface SpeedOption {
  title: SpeedEnum;
  value: string;
}

export const speedOptions = [
  { title: SpeedEnum.Slow, value: '1' },
  { title: SpeedEnum.Medium, value: '1.25' },
  { title: SpeedEnum.Fast, value: '1.5' },
  { title: SpeedEnum.Own, value: SpeedEnum.Own }
];

export const requiredFieldRule = { required: requiredFieldError };

export const ownGasFeeRules = {
  ...requiredFieldRule,
  validate: {
    isGreaterThanZero: (value: string) => Number(value) > 0 || 'Should be greater than 0'
  }
};
