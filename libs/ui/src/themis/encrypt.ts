import { initialized, SecureCellSeal, SymmetricKey } from 'wasm-themis';

export const encrypt = async (seed: string, passwordHash: string) => {
  await initialized;

  const symmetricKey = new SymmetricKey();
  const salt = SecureCellSeal.withKey(symmetricKey);
  const secureText = new Uint8Array([...Buffer.from(seed)]);
  const context = new Uint8Array([...Buffer.from(passwordHash)]);
  const encrypted = salt.encrypt(secureText, context);

  return { encrypted, symmetricKey };
};
