import { IMPORTED_BY_SEED_PUBLIC_KEY, IMPORTED_BY_PRIVATE_KEY_PUBLIC_KEY } from './env.utils';

export const getPublicKeyVariable = (accountPublicKey: string) => {
  let publicKey = '';

  switch (accountPublicKey) {
    case 'imported by seed':
      publicKey = IMPORTED_BY_SEED_PUBLIC_KEY;
      break;
    case 'imported by private key':
      publicKey = IMPORTED_BY_PRIVATE_KEY_PUBLIC_KEY;
      break;
  }

  return publicKey;
};
