import { FC } from 'react';
import { SvgProps } from 'react-native-svg';

import ActivitySmallIcon from './assets/activity-small.svg';
import ActivityIcon from './assets/activity.svg';
import AddChain from './assets/add-chain.svg';
import AddSmallIcon from './assets/add-small.svg';
import AddIcon from './assets/add.svg';
import ArrowLeftIcon from './assets/arrow-left.svg';
import ArrowRightSmall from './assets/arrow-right-small.svg';
import ArrowRightIcon from './assets/arrow-right.svg';
import AssetsIcon from './assets/assets.svg';
import CheckDoneIcon from './assets/check-done.svg';
import CheckEmptyIcon from './assets/check-empty.svg';
import SelectedSquareCheckbox from './assets/check-ok.svg';
import ChevronRight from './assets/chevron-right.svg';
import ChevronUp from './assets/chevron-up.svg';
import Chevron from './assets/chevron.svg';
import Circle from './assets/circle.svg';
import Clear from './assets/clear.svg';
import Close from './assets/close.svg';
import CopyIcon from './assets/copy.svg';
import DappConnect from './assets/dapp-connect.svg';
import Delete from './assets/delete.svg';
import Deposit from './assets/deposit.svg';
import Discord from './assets/discord.svg';
import Document from './assets/document.svg';
import DropdownSelector from './assets/dropdown-selector.svg';
import DropdownIcon from './assets/dropdown.svg';
import DropupIcon from './assets/dropup.svg';
import EditSmall from './assets/edit-small.svg';
import EditIcon from './assets/edit.svg';
import EmptyCheckbox from './assets/empty-checkbox.svg';
import EmptySearch from './assets/empty-search.svg';
import EmptySquareCheckbox from './assets/empty-square-checkbox.svg';
import Error from './assets/error.svg';
import EyeClosedIcon from './assets/eye-closed.svg';
import EyeOpenIcon from './assets/eye-open.svg';
import FaceId from './assets/face-id.svg';
import FilterNo from './assets/filter-no.svg';
import FilterYes from './assets/filter-yes.svg';
import GasIcon from './assets/gas.svg';
import GridSettings from './assets/grid-settings.svg';
import HdAccount from './assets/hd-account.svg';
import Home from './assets/home.svg';
import IconDisconnect from './assets/icon-disconnect.svg';
import IconPlaceholder from './assets/icon-placeholder.svg';
import IconWarning from './assets/icon-warning.svg';
import ImportedAccount from './assets/imported-account.svg';
import InfoRed from './assets/info-red.svg';
import InfoToast from './assets/info-toast.svg';
import Info from './assets/info.svg';
import LedgerAccount from './assets/ledger-account.svg';
import LoadersIcon from './assets/loaders.svg';
import LockClosed from './assets/lock-closed.svg';
import LockOpen from './assets/lock-open.svg';
import MadWithLove from './assets/mad-with-love.svg';
import Maximize from './assets/maximize.svg';
import NewTab from './assets/new-tab.svg';
import NftCollectionLayout from './assets/nft-collection-layout.svg';
import NftLayout from './assets/nft-layout.svg';
import NftIcon from './assets/nft.svg';
import OutLink from './assets/out-link.svg';
import OutIcon from './assets/out.svg';
import PartnersIcon from './assets/partners.svg';
import Paste from './assets/paste.svg';
import PixelShit from './assets/pixel-shit.svg';
import QrScanner from './assets/qr-scanner.svg';
import QrIcon from './assets/qr.svg';
import QrscanIcon from './assets/qrscan.svg';
import RadioOn from './assets/radio-on.svg';
import ReceiveSmallIcon from './assets/receive-small.svg';
import ReceiveIcon from './assets/receive.svg';
import Reddit from './assets/reddit.svg';
import Refresh from './assets/refresh.svg';
import RevealSeedPhrase from './assets/reveal-seed-phrase.svg';
import SearchIcon from './assets/search.svg';
import Security from './assets/security.svg';
import See from './assets/see.svg';
import SelectedCheckbox from './assets/selected-checkbox.svg';
import SendSmallIcon from './assets/send-small.svg';
import SendIcon from './assets/send.svg';
import SettingsIcon from './assets/settings.svg';
import Share from './assets/share.svg';
import Slider from './assets/slider.svg';
import StakeIcon from './assets/stake.svg';
import Success from './assets/success.svg';
import SwapSmallIcon from './assets/swap-small.svg';
import SwapIcon from './assets/swap.svg';
import SwapItems from './assets/swapItems.svg';
import Telegram from './assets/telegram.svg';
import Tooltip from './assets/tooltip.svg';
import TopupIcon from './assets/topup.svg';
import TransparencyLayout from './assets/transparency-layout.svg';
import Twitter from './assets/twitter.svg';
import User from './assets/user.svg';
import WalletLogoPlaceholder from './assets/wallet-logo-placeholder.svg';
import WarningWhite from './assets/warning-white.svg';
import WarningYellow from './assets/warning-yellow.svg';
import XIcon from './assets/x.svg';
import Youtube from './assets/youtube.svg';
import { IconNameEnum } from './icon-name.enum';
import Arbitrum from './networks/arbitrum.svg';
import Avalanche from './networks/avalanche.svg';
import BinanceSmartChain from './networks/bsc.svg';
import Ethereum from './networks/ethereum.svg';
import NetworkFallback from './networks/fallback.svg';
import Fantom from './networks/fantom.svg';
import Klaytn from './networks/klaytn.svg';
import Optimism from './networks/optimism.svg';
import Polygon from './networks/polygon.svg';

export const iconNameMap: Record<IconNameEnum, FC<SvgProps>> = {
  [IconNameEnum.Paste]: Paste,
  [IconNameEnum.Activity]: ActivityIcon,
  [IconNameEnum.ActivitySmall]: ActivitySmallIcon,
  [IconNameEnum.Add]: AddIcon,
  [IconNameEnum.AddSmall]: AddSmallIcon,
  [IconNameEnum.ArrowLeft]: ArrowLeftIcon,
  [IconNameEnum.ArrowRight]: ArrowRightIcon,
  [IconNameEnum.ArrowRightSmall]: ArrowRightSmall,
  [IconNameEnum.Assets]: AssetsIcon,
  [IconNameEnum.CheckDone]: CheckDoneIcon,
  [IconNameEnum.CheckEmpty]: CheckEmptyIcon,
  [IconNameEnum.Copy]: CopyIcon,
  [IconNameEnum.Dropdown]: DropdownIcon,
  [IconNameEnum.Dropup]: DropupIcon,
  [IconNameEnum.Edit]: EditIcon,
  [IconNameEnum.EditSmall]: EditSmall,
  [IconNameEnum.EyeClosed]: EyeClosedIcon,
  [IconNameEnum.EyeOpen]: EyeOpenIcon,
  [IconNameEnum.Gas]: GasIcon,
  [IconNameEnum.Loaders]: LoadersIcon,
  [IconNameEnum.Nft]: NftIcon,
  [IconNameEnum.Out]: OutIcon,
  [IconNameEnum.Partners]: PartnersIcon,
  [IconNameEnum.Qrscan]: QrscanIcon,
  [IconNameEnum.Receive]: ReceiveIcon,
  [IconNameEnum.ReceiveSmall]: ReceiveSmallIcon,
  [IconNameEnum.Search]: SearchIcon,
  [IconNameEnum.Send]: SendIcon,
  [IconNameEnum.SendSmall]: SendSmallIcon,
  [IconNameEnum.Settings]: SettingsIcon,
  [IconNameEnum.Stake]: StakeIcon,
  [IconNameEnum.Swap]: SwapIcon,
  [IconNameEnum.SwapSmall]: SwapSmallIcon,
  [IconNameEnum.Topup]: TopupIcon,
  [IconNameEnum.X]: XIcon,
  [IconNameEnum.Klaytn]: Klaytn,
  [IconNameEnum.Ethereum]: Ethereum,
  [IconNameEnum.BinanceSmartChain]: BinanceSmartChain,
  [IconNameEnum.NetworkFallback]: NetworkFallback,
  [IconNameEnum.Qrcode]: QrIcon,
  [IconNameEnum.Slider]: Slider,
  [IconNameEnum.AddChain]: AddChain,
  [IconNameEnum.Share]: Share,
  [IconNameEnum.GridSettings]: GridSettings,
  [IconNameEnum.SelectedCheckbox]: SelectedCheckbox,
  [IconNameEnum.SelectedSquareCheckbox]: SelectedSquareCheckbox,
  [IconNameEnum.EmptyCheckbox]: EmptyCheckbox,
  [IconNameEnum.EmptySquareCheckbox]: EmptySquareCheckbox,
  [IconNameEnum.EmptySearch]: EmptySearch,
  [IconNameEnum.Tooltip]: Tooltip,
  [IconNameEnum.Delete]: Delete,
  [IconNameEnum.Clear]: Clear,
  [IconNameEnum.Success]: Success,
  [IconNameEnum.Error]: Error,
  [IconNameEnum.SwapItems]: SwapItems,
  [IconNameEnum.IconPlaceholder]: IconPlaceholder,
  [IconNameEnum.LockOpen]: LockOpen,
  [IconNameEnum.LockClosed]: LockClosed,
  [IconNameEnum.WarningWhite]: WarningWhite,
  [IconNameEnum.WarningYellow]: WarningYellow,
  [IconNameEnum.Error]: Error,
  [IconNameEnum.QrScanner]: QrScanner,
  [IconNameEnum.Chevron]: Chevron,
  [IconNameEnum.ChevronUp]: ChevronUp,
  [IconNameEnum.DropdownSelector]: DropdownSelector,
  [IconNameEnum.Refresh]: Refresh,
  [IconNameEnum.Info]: Info,
  [IconNameEnum.Deposit]: Deposit,
  [IconNameEnum.NftCollectionLayout]: NftCollectionLayout,
  [IconNameEnum.PixelShit]: PixelShit,
  [IconNameEnum.NftLayout]: NftLayout,
  [IconNameEnum.TransparencyLayout]: TransparencyLayout,
  [IconNameEnum.IconDisconnect]: IconDisconnect,
  [IconNameEnum.InfoRed]: InfoRed,
  [IconNameEnum.Maximize]: Maximize,
  [IconNameEnum.ChevronRight]: ChevronRight,
  [IconNameEnum.Security]: Security,
  [IconNameEnum.DappConnect]: DappConnect,
  [IconNameEnum.Telegram]: Telegram,
  [IconNameEnum.Twitter]: Twitter,
  [IconNameEnum.Discord]: Discord,
  [IconNameEnum.Reddit]: Reddit,
  [IconNameEnum.Youtube]: Youtube,
  [IconNameEnum.OutLink]: OutLink,
  [IconNameEnum.MadWithLove]: MadWithLove,
  [IconNameEnum.NewTab]: NewTab,
  [IconNameEnum.See]: See,
  [IconNameEnum.WalletLogoPlaceholder]: WalletLogoPlaceholder,
  [IconNameEnum.IconWarning]: IconWarning,
  [IconNameEnum.FaceId]: FaceId,
  [IconNameEnum.Home]: Home,
  [IconNameEnum.Fantom]: Fantom,
  [IconNameEnum.Avalanche]: Avalanche,
  [IconNameEnum.Arbitrum]: Arbitrum,
  [IconNameEnum.Optimism]: Optimism,
  [IconNameEnum.Polygon]: Polygon,
  [IconNameEnum.User]: User,
  [IconNameEnum.Close]: Close,
  [IconNameEnum.InfoToast]: InfoToast,
  [IconNameEnum.FilterNo]: FilterNo,
  [IconNameEnum.FilterYes]: FilterYes,
  [IconNameEnum.Document]: Document,
  [IconNameEnum.Circle]: Circle,
  [IconNameEnum.RadioOn]: RadioOn,
  [IconNameEnum.HdAccount]: HdAccount,
  [IconNameEnum.ImportedAccount]: ImportedAccount,
  [IconNameEnum.LedgerAccount]: LedgerAccount,
  [IconNameEnum.RevealSeedPhrase]: RevealSeedPhrase
};
