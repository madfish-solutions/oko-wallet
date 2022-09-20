import { mobileWidth } from '../../constants/mobile-dimensions';

// paddingHorizontal: 16px * 2; offset between nft: 16px = 48px
export const customNftContainerWidth = (mobileWidth - 48) / 2;

// TODO: Remove later - only for test
export const SINGLE_NFT = {
  amount: 1,
  artifactUri: '',
  balance: { data: '0', isLoading: false },
  collectionId: null,
  contractName: 'single_test_nft',
  decimals: 0,
  isVisible: true,
  name: 'Single NFT',
  symbol: '',
  tokenAddress: '0x01866aa66ea2e771cb2f927ddedadef58ad939e3',
  tokenId: '312'
};
