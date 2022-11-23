import { Erc165Abi__factory } from '../../../../contract-types';
import { TokenStandardEnum } from '../../../../enums/token-standard.enum';
import { getDefaultEvmProvider } from '../../../../utils/get-default-evm-provider.utils';

const Erc721InterfaceId = '0x80ac58cd';

export const getCollectibleErcStandard = async ({ tokenAddress, rpcUrl }: { tokenAddress: string; rpcUrl: string }) => {
  const provider = getDefaultEvmProvider(rpcUrl);
  const erc165 = Erc165Abi__factory.connect(tokenAddress, provider);

  try {
    const isErc721: boolean = await erc165.supportsInterface(Erc721InterfaceId);

    return isErc721 ? TokenStandardEnum.ERC721 : TokenStandardEnum.ERC1155;
  } catch (error) {
    console.log('error', error);

    return undefined;
  }
};
