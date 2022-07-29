import { validateAddress, ValidationResult } from '@taquito/utils';

export const isValidAddress = (address: string) => validateAddress(address) === ValidationResult.VALID;
