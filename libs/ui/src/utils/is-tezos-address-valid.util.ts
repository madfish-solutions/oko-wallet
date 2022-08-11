import { validateAddress, ValidationResult } from '@taquito/utils';

export const isTezosAddressValid = (address: string) => validateAddress(address) === ValidationResult.VALID;
