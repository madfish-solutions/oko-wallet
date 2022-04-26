import { SymmetricKey, initialized } from 'wasm-themis';

export const symmetricKey = async () => {
  await initialized;

  return new SymmetricKey();
}
