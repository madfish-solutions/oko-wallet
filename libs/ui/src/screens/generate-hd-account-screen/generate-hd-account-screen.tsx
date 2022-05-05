import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useDispatch } from 'react-redux';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar-test';
import { generateHDAccount } from '../../store/wallet/wallet.actions';
import { getEtherDerivationPath, getTezosDerivationPath } from '../../utils/derivation-path.utils';
import { generateHdAccount } from '../../utils/generate-hd-account.util';

import { SEED_PHRASE } from './constants';
import { GenerateHdAccountStyles } from './generate-hd-account-screen.styles';

type Account = Record<string, string>;

let klaytnAccount0: Account, klaytnAccount1: Account, tezosAccount: Account;

generateHdAccount(SEED_PHRASE, getEtherDerivationPath()).then(keys => {
  klaytnAccount0 = keys;
});
generateHdAccount(SEED_PHRASE, getEtherDerivationPath(1)).then(keys => {
  klaytnAccount1 = keys;
});
generateHdAccount(SEED_PHRASE, getTezosDerivationPath()).then(keys => {
  tezosAccount = { ...keys };
});

export const GenerateHdAccountScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateHDAccount());
  }, []);

  return (
    <View>
      <NavigationBar />
      <View style={GenerateHdAccountStyles.container}>
        <Text style={GenerateHdAccountStyles.boldText}>Seed Phrase:</Text>
        <Text>{SEED_PHRASE}</Text>
        <View style={GenerateHdAccountStyles.block}>
          <Text style={GenerateHdAccountStyles.boldText}>Derivation path: m/44'/60'/0'/0</Text>
          <Text style={GenerateHdAccountStyles.boldText}>Address key Klaytn:</Text>
          <Text>{klaytnAccount0.address}</Text>
          <Text style={GenerateHdAccountStyles.boldText}>Private key Klaytn:</Text>
          <Text>{klaytnAccount0.privateKey}</Text>
        </View>
        <View style={GenerateHdAccountStyles.block}>
          <Text style={GenerateHdAccountStyles.boldText}>Derivation path: m/44'/60'/1'/0</Text>
          <Text style={GenerateHdAccountStyles.boldText}>Address key Klaytn:</Text>
          <Text>{klaytnAccount1.address}</Text>
          <Text style={GenerateHdAccountStyles.boldText}>Private key Klaytn:</Text>
          <Text>{klaytnAccount1.privateKey}</Text>
        </View>
        <View style={GenerateHdAccountStyles.block}>
          <Text style={GenerateHdAccountStyles.boldText}>Derivation path: m/44'/1729'/0'/0</Text>
          <Text style={GenerateHdAccountStyles.boldText}>Private key Tezos:</Text>
          <Text>{tezosAccount.privateKey}</Text>
          <Text style={GenerateHdAccountStyles.boldText}>Address key Tezos:</Text>
          <Text>{tezosAccount.address}</Text>
        </View>
      </View>
    </View>
  );
};
