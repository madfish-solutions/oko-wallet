import { StyleSheet } from "react-native";

export const MnemonicTextInputStyles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 8,
    cursor: 'pointer',
  },
  textarea: {
    position: 'relative',
    textAlignVertical: 'top',
    minHeight: 140,
    maxHeight: 140,
    paddingTop: 12,
  },
  button: {
    marginBottom: 16,
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 18,
  }
});
