import { AccountInterface } from 'shared';
import { PASSWORD_CHECK_KEY, SEED_PHRASE_KEY } from 'shelter';

export const getSensitiveDataKeys = (accounts: AccountInterface[]) => {
  const sensitiveKeys = [PASSWORD_CHECK_KEY, SEED_PHRASE_KEY];

  const publicKeys = accounts.reduce<string[]>((keys, account) => {
    if (account.networksKeys?.EVM?.publicKey !== undefined) {
      keys = [...keys, account.networksKeys?.EVM?.publicKeyHash];
    }
    if (account.networksKeys?.Tezos?.publicKey !== undefined) {
      keys = [...keys, account.networksKeys?.Tezos?.publicKeyHash];
    }

    return keys;
  }, []);

  return [...publicKeys, ...sensitiveKeys];
};
