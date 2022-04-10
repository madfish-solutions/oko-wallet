import React, {useEffect} from 'react';
import {Platform, SafeAreaView, ScrollView, Text} from "react-native";
import {TestComponent} from "./test-component/test-component";

export const App = () => {
  useEffect(() => {
    console.log('Shared App component rendering');
    console.log('OS:', Platform.OS);
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <TestComponent/>
        <TestComponent/>
        <TestComponent/>
        <Text>Welcome1233</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
        <Text>Welcome123</Text>
        <Text>to</Text>
        <Text>the</Text>
        <Text>shared</Text>
        <Text>code</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
