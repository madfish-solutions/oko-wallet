import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';

export const styles = StyleSheet.create({
  emptyNFT: {
    overflow: 'hidden',
    borderRadius: getCustomSize(1.75)
  },
  image: {
    height: 98,
    width: 98,
    borderRadius: getCustomSize(0.5),
    backgroundColor: colors.navGrey1,
    justifyContent: 'center',
    marginRight: getCustomSize(0.25)
  },
  imageFirst: {
    borderTopLeftRadius: getCustomSize(1.75),
    borderTopRightRadius: getCustomSize(0.5),
    borderBottomLeftRadius: getCustomSize(1.75),
    borderBottomRightRadius: getCustomSize(0.5)
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    marginRight: getCustomSize(0.25),
    paddingHorizontal: getCustomSize(0.25)
  },
  pressable: {
    flexDirection: 'row'
  },
  buttons: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  button: {
    marginBottom: getCustomSize(0.25),
    borderRadius: getCustomSize(0.5)
  },
  buttonTop: {
    borderTopRightRadius: getCustomSize(1.75)
  },
  buttonBottom: {
    borderBottomRightRadius: getCustomSize(1.75)
  }
});
