import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { StyleProp, Text, TextStyle, TouchableOpacity, View } from 'react-native';

import { Button } from '../button';

import { DropdownStyles } from './dropdown.styles';

type DropdownProps = {
  data: string[];
  onPress: (arg?: any) => void;
  isOpen: boolean;
  setVisibleState: <T>(arg: T) => void;
  setSelectedItem: (arg: any) => void;
  selectedItem: string;
  style?: StyleProp<TextStyle>;
};

export const Dropdown: React.FC<DropdownProps> = ({
  data,
  isOpen,
  setVisibleState,
  onPress,
  setSelectedItem,
  selectedItem,
  style
}) => {
  const handleItemPress = (network: string) => {
    onPress(network);
    setVisibleState(false);
    setSelectedItem(network);
  };

  return (
    <View style={[DropdownStyles.root, style]}>
      <TouchableOpacity onPress={setVisibleState} style={DropdownStyles.select}>
        <Text style={DropdownStyles.white}>{selectedItem}</Text>
      </TouchableOpacity>

      <View style={[DropdownStyles.dropdown, isOpen ? DropdownStyles.open : DropdownStyles.close]}>
        {data.map(network => (
          <Button
            key={nanoid()}
            theme="secondary"
            onPress={() => handleItemPress(network)}
            textStyle={DropdownStyles.white}
          >
            {network}
          </Button>
        ))}
      </View>
    </View>
  );
};
