import React, { useState, useCallback, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { MnemonicTextInputStyles } from './mnemonic-text-input.styles';

import { StyledTextInput } from '../text-input';

export const MnemonicTextInput: React.FC = () => {
  const [isShowOverlay, setIsShowOverlay] = useState(true);
  const mnemonicInputRef = useRef(null);

  const handleOverlayPress = useCallback(() => { 
    setIsShowOverlay(false);
    (mnemonicInputRef.current as any).focus();
  }, []);

  const handleBlurOfMnemonicArea = useCallback(() => {
    setIsShowOverlay(true);
  }, []);

  return (
    <View style={MnemonicTextInputStyles.root}>
      <StyledTextInput 
        value="mnemonic phrase mnemonic phrase mnemonic phrase mnemonic phrase mnemonic phrase mnemonic phrase mnemonic phrase"
        ref={mnemonicInputRef} 
        editable={false}
        selectTextOnFocus
        onBlur={handleBlurOfMnemonicArea} 
        numberOfLines={6}
        style={[MnemonicTextInputStyles.textarea]}
      />
      {isShowOverlay && (
        <TouchableOpacity 
          onPress={handleOverlayPress} 
          style={MnemonicTextInputStyles.overlay}
        >
          <Text style={MnemonicTextInputStyles.text}>Protected</Text>
        </TouchableOpacity>
      )}
    </View>
  ); 
} 
