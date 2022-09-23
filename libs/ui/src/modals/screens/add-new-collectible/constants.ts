import { mobileWidth } from '../../../constants/mobile-dimensions';
import { getCustomSize } from '../../../styles/format-size';
import { checkActiveApplicationSession } from '../../../utils/check-active-application-session.util';
import { isMobile } from '../../../utils/platform.utils';

const { isMaximiseScreenOpened } = checkActiveApplicationSession();

enum DeviceEnum {
  Mobile = 'mobile',
  Web = 'web'
}

const getSize = (number: number, isMobile: DeviceEnum = DeviceEnum.Web) =>
  isMobile ? mobileWidth - number : window.innerWidth - number;

export const COLLECTIBLE_SIZE = isMobile
  ? getSize(getCustomSize(4), DeviceEnum.Mobile)
  : isMaximiseScreenOpened
  ? getSize(getCustomSize(4))
  : getSize(getCustomSize(6));
