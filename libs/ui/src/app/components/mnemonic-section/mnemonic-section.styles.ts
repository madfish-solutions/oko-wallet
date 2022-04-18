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
  button: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 18,
    height: 28,
    width: 100,
    paddingRight: 8,
    paddingLeft: 8,
    borderRadius: 20
  }
});
