import React from 'react';
import { Text } from "react-native";

import { Wrapper } from '../../app/components/wrapper';
import {NavigationBar} from "../../components/navigation-bar/navigation-bar";

export const InnerScreen: React.FC = () => {
  return (
    <Wrapper>
      <NavigationBar/>
      <Text>Inner Screen Content</Text>
      <Text>Inner Screen Content</Text>
      <Text>Inner Screen Content</Text>
    </Wrapper>
  );
}
