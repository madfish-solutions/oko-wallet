import React from 'react';
import {Text, View} from "react-native";

export const App = () => {
  console.log('Shared App component rendering');

  return <View>
    <Text>Welcome123</Text>
    <Text>to</Text>
    <Text>the</Text>
    <Text>shared</Text>
    <Text>code</Text>
  </View>
}
