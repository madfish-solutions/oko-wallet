import { SymmetricKey, initialized } from 'wasm-themis';

export const symmetricKey = async (): Promise<string> => {
  await initialized;

  return new SymmetricKey().toString();
};
