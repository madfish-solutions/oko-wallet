import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import ActivityIcon from './assets/activity.svg';
import AddIcon from './assets/add.svg';
import ArrowLeftIcon from './assets/arrow-left.svg';
import ArrowRightIcon from './assets/arrow-right.svg';
import AssetsIcon from './assets/assets.svg';
import CheckDoneIcon from './assets/check-done.svg';
import CheckEmptyIcon from './assets/check-empty.svg';
import CopyIcon from './assets/copy.svg';
import DropdownIcon from './assets/dropdown.svg';
import DropupIcon from './assets/dropup.svg';
import EditIcon from './assets/edit.svg';
import EyeClosedIcon from './assets/eye-closed.svg';
import EyeOpenIcon from './assets/eye-open.svg';
import GasIcon from './assets/gas.svg';
import NftIcon from './assets/nft.svg';
import OutIcon from './assets/out.svg';
import PartnersIcon from './assets/partners.svg';
import QrscanIcon from './assets/qrscan.svg';
import ReceiveIcon from './assets/receive.svg';
import SearchIcon from './assets/search.svg';
import SendIcon from './assets/send.svg';
import SettingsIcon from './assets/settings.svg';
import StakeIcon from './assets/stake.svg';
import SwapIcon from './assets/swap.svg';
import TopupIcon from './assets/topup.svg';
import XIcon from './assets/x.svg';
import { IconNameEnum } from './icon-name.enum';

export const iconNameMap: Record<IconNameEnum, FC<SvgProps>> = {
  [IconNameEnum.Activity]: ActivityIcon,
  [IconNameEnum.Add]: AddIcon,
  [IconNameEnum.ArrowLeft]: ArrowLeftIcon,
  [IconNameEnum.ArrowRight]: ArrowRightIcon,
  [IconNameEnum.Assets]: AssetsIcon,
  [IconNameEnum.CheckDone]: CheckDoneIcon,
  [IconNameEnum.CheckEmpty]: CheckEmptyIcon,
  [IconNameEnum.Copy]: CopyIcon,
  [IconNameEnum.Dropdown]: DropdownIcon,
  [IconNameEnum.Dropup]: DropupIcon,
  [IconNameEnum.Edit]: EditIcon,
  [IconNameEnum.EyeClosed]: EyeClosedIcon,
  [IconNameEnum.EyeOpen]: EyeOpenIcon,
  [IconNameEnum.Gas]: GasIcon,
  [IconNameEnum.Nft]: NftIcon,
  [IconNameEnum.Out]: OutIcon,
  [IconNameEnum.Partners]: PartnersIcon,
  [IconNameEnum.Qrscan]: QrscanIcon,
  [IconNameEnum.Receive]: ReceiveIcon,
  [IconNameEnum.Search]: SearchIcon,
  [IconNameEnum.Send]: SendIcon,
  [IconNameEnum.Settings]: SettingsIcon,
  [IconNameEnum.Stake]: StakeIcon,
  [IconNameEnum.Swap]: SwapIcon,
  [IconNameEnum.Topup]: TopupIcon,
  [IconNameEnum.X]: XIcon
};
