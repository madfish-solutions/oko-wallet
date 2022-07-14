import { Dimensions, StyleSheet } from 'react-native';

import { colors } from '../../styles/colors';
import { EXTENSION_FULL_SIZE, getCustomSize } from '../../styles/format-size';
import { isWeb } from '../../utils/platform.utils';

const headerHeight = isWeb ? getCustomSize(15.25) : getCustomSize(11.75);
const navBarHeight = getCustomSize(11.5);
const extraElements = headerHeight + navBarHeight;
const qrCodeHeight = getCustomSize(20);

const contentHeight = Dimensions.get('window').height - extraElements + qrCodeHeight;

export const styles = StyleSheet.create({
  root: {
    position: 'relative',
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: isWeb ? EXTENSION_FULL_SIZE : '100%',
    backgroundColor: colors.bgGrey1,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  qrCodeWrapper: {
    position: 'relative',
    marginBottom: getCustomSize(2),
    paddingBottom: getCustomSize(2),
    paddingHorizontal: getCustomSize(2),
    backgroundColor: colors.bgGrey2,
    borderBottomLeftRadius: getCustomSize(3),
    borderBottomRightRadius: getCustomSize(3)
  },
  layout: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: '100%',
    height: 600,
    backgroundColor: colors.bgGrey2
  },
  contentContainer: {
    height: contentHeight,
    flexShrink: 0
  },
  container: {
    marginTop: getCustomSize(-7),
    paddingTop: getCustomSize(7)
  },
  content: {
    marginTop: getCustomSize(-7),
    paddingTop: getCustomSize(7),
    padding: getCustomSize(2),
    zIndex: -1
  }
});
