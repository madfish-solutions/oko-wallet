import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { generateSeed } from '../../utils/keys.util';

export const WelcomeScreen = () => {
  const [seed, setSeed] = useState('');

  useEffect(() => {
    generateSeed().then(newSeed => setSeed(newSeed));
  }, []);

  return (
    <View>
      <NavigationBar />
      <Text>Welcome Screen Content</Text>
      <Text>Welcome Screen Content</Text>
      <Text>Welcome Screen Content</Text>
      <Text>Randomly generated SEED:</Text>
      <Text>{seed}</Text>
    </View>
  );
};
