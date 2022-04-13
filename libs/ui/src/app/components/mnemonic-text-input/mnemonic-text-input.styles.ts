import { StyleSheet } from "react-native";

export const MnemonicTextInputStyles = StyleSheet.create({
  root: {
    position: 'relative',
    cursor: 'pointer',
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(237, 242, 247, 1)',
    border: '3px solid #e1e0e0',
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#979797',
    fontWeight: "700",
  },
  textarea: {
    position: 'relative',
    border: '3px solid #e1e0e0',
  }
});
