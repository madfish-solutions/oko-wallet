import { StyleSheet } from "react-native";

export const MnemonicTextInputStyles = StyleSheet.create({
  root: {
    position: 'relative',
    cursor: 'pointer',
  },
  textarea: {
    position: 'relative',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: "#e1e0e0",
  },
  overlay: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: "#e1e0e0",
    backgroundColor: 'rgba(237, 242, 247, 1)',
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#979797',
    fontWeight: "700",
  },
});
