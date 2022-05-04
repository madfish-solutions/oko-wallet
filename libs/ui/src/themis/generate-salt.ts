import { initialized, SecureCellSeal } from 'wasm-themis';

export const generateSalt = async (password: string) => {
  await initialized;
  const salt = SecureCellSeal.withPassphrase(password);

  return salt;
};
