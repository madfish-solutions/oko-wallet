import React from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { generateKlaytnHdAccount } from '../../utils/generateKlaytnHdAccount.util';
import { generateTezosHdAccount } from '../../utils/generateTezosHdAccount.util';

import { SEED_PHRASE } from './constants';
import { GenerateHdAccountStyles } from './generate-hd-account-screen.styles';

const klaytnAccount0 = generateKlaytnHdAccount(SEED_PHRASE);
const klaytnAccount1 = generateKlaytnHdAccount(SEED_PHRASE, 1);

let tezos: Record<string, string> = {};
generateTezosHdAccount(SEED_PHRASE).then(keys => {
  tezos = { ...keys };
});

export const GenerateHdAccountScreen = () => (
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
        <Text>{tezos.privateKey}</Text>
        <Text style={GenerateHdAccountStyles.boldText}>Address key Tezos:</Text>
        <Text>{tezos.address}</Text>
      </View>
    </View>
  </View>
);
