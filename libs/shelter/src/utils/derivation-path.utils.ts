import { ETHER_BIP44_COINTYPE, TEZOS_BIP44_COINTYPE } from '../constants/cointype';

export const getEtherDerivationPath = (accountIndex = 0) => `m/44'/${ETHER_BIP44_COINTYPE}'/0'/0/${accountIndex}`;
export const getTezosDerivationPath = (accountIndex = 0) => `m/44'/${TEZOS_BIP44_COINTYPE}'/${accountIndex}'/0'`;
