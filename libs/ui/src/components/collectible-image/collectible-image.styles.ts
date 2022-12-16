import { StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { getCustomSize } from '../../styles/format-size';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderRadius: getCustomSize(0.5),
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  pixelShitIcon: {
    position: 'absolute'
  },
  layout: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: getCustomSize(0.5)
  },
  pendingLoader: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bgGrey1,
    opacity: 0.5
  },
  pendingTextBlock: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.bgGrey2,
    paddingHorizontal: getCustomSize(0.75),
    paddingVertical: getCustomSize(0.1875),
    marginBottom: getCustomSize(2)
  },
  pendingText: {
    color: colors.textGrey1,
    ...typography.numbersIBMPlexSansBold8,
    textTransform: 'uppercase'
  }
});
