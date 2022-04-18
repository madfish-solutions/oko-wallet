import React, { useState, useCallback, useRef } from 'react';
import { GestureResponderEvent, StyleProp, Text, TextInputProps, TextStyle, TouchableOpacity, View } from 'react-native';

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
  const [isShowOverlay, setIsShowOverlay] = useState(true);
  const mnemonicInputRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOverlayPress = useCallback(() => { 
    setIsShowOverlay(false);
    (mnemonicInputRef.current as any).focus();
  }, []);

  const handleBlurOfMnemonicArea = useCallback(() => {
    setIsShowOverlay(true);
  }, []);

  const handleClick = useCallback(() => {
    onPress();
    (mnemonicInputRef.current as any).focus();
  }, [onPress]);

  const handleLayoutClick = useCallback((e: GestureResponderEvent) => {
    // Add ref to TouchableOpacity
    console.log(...[e.currentTarget]);
    console.log(buttonRef.current);
  }, []);

  return (
    <View style={[style]}>
      <Title description={description}>
        {title}
      </Title>
      <TouchableOpacity 
        onPress={handleLayoutClick}
        style={[MnemonicTextInputStyles.wrapper]}
      >
        <StyledTextInput 
          textAlignVertical='top'
          value={mnemonic}
          ref={mnemonicInputRef} 
          selectTextOnFocus
          onBlur={handleBlurOfMnemonicArea} 
          numberOfLines={numberOfLines}
          style={[MnemonicTextInputStyles.textarea]}
          {...props}
        />
        <Button 
          ref={buttonRef}
          onPress={handleClick}
          title="New phrase"
          style={MnemonicTextInputStyles.button}
        />
        {isShowOverlay && (
          <TouchableOpacity 
            onPress={handleOverlayPress} 
            style={MnemonicTextInputStyles.overlay}
          >
            <Text style={MnemonicTextInputStyles.text}>
              Protected
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  ); 
} 
