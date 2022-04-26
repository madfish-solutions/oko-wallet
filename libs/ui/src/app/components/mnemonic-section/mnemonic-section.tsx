import React, { useCallback, useRef } from 'react';
import { StyleProp, TextInputProps, TextStyle, TouchableOpacity, View } from 'react-native';

import { MnemonicTextInputStyles } from './mnemonic-section.styles';

import { StyledTextInput } from '../text-input';
import { Button } from '../button';
import { Title } from '../title';

type MnemonicSectionProps = {
  mnemonic: string;
  title: string;
  description?: string;
  numberOfLines?: number;
  onPress: () => void;
  style?: StyleProp<TextStyle>;
} & TextInputProps;

export const MnemonicSection: React.FC<MnemonicSectionProps> = ({
  title,
  description,
  mnemonic,
  numberOfLines = 6,
  onPress,
  style,
  ...props
}) => {
  const mnemonicInputRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClick = useCallback(() => {
    onPress();
  }, [onPress]);

  return (
    <View style={[style]}>
      <Title description={description}>
        {title}
      </Title>
      <TouchableOpacity 
        style={[MnemonicTextInputStyles.wrapper]}
      >
        <StyledTextInput 
          textAlignVertical='top'
          value={mnemonic}
          ref={mnemonicInputRef} 
          selectTextOnFocus
          numberOfLines={numberOfLines}
          style={[MnemonicTextInputStyles.textarea]}
          {...props}
        />
      </TouchableOpacity>
      <Button 
        ref={buttonRef}
        onPress={handleClick}
        title="New phrase"
        style={MnemonicTextInputStyles.button}
      />
    </View>
  ); 
} 
