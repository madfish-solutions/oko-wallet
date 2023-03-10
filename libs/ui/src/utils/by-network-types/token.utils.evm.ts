import { Provider } from '@ethersproject/abstract-provider';
import { isDefined } from '@rnw-community/shared';
import { getDefaultProvider } from 'ethers';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenStandardEnum } from 'shared';

import { Erc1155Abi__factory, Erc20Abi__factory, Erc721Abi__factory } from '../../contract-types';
import { NetworkInterface } from '../../interfaces/network.interface';
import { Token } from '../../interfaces/token.interface';

interface GetCollectibleBalanceArg {
  tokenAddress: string;
  tokenId?: string;
  provider: Provider;
  publicKeyHash: string;
}

export const loadEvmGasTokenBalance$ = ({ rpcUrl }: NetworkInterface, publicKeyHash: string): Observable<string> => {
  const provider = getDefaultProvider(rpcUrl);

  return from(provider.getBalance(publicKeyHash)).pipe(map(balance => balance.toString()));
};

export const loadEvmTokenBalance$ = (
  { rpcUrl }: NetworkInterface,
  publicKeyHash: string,
  { tokenAddress, tokenId, standard }: Token
): Observable<string> => {
  const provider = getDefaultProvider(rpcUrl);

  switch (standard) {
    case TokenStandardEnum.ERC721:
      return from(getErc721CollectibleBalance({ tokenAddress, tokenId, provider, publicKeyHash }));

    case TokenStandardEnum.ERC1155:
      return from(getErc1155CollectibleBalance({ tokenAddress, tokenId, provider, publicKeyHash }));

    default:
      const contract20 = Erc20Abi__factory.connect(tokenAddress, provider);

      return from(contract20.balanceOf(publicKeyHash)).pipe(map(balance => balance.toString()));
  }
};

const getErc721CollectibleBalance = async ({
  tokenAddress,
  tokenId = '0',
  provider,
  publicKeyHash
}: GetCollectibleBalanceArg) => {
  const contract721 = Erc721Abi__factory.connect(tokenAddress, provider);
  const ownerOfCollectible = await contract721.ownerOf(tokenId);
  const balance = Number(ownerOfCollectible === publicKeyHash);

  return balance.toString();
};

const getErc1155CollectibleBalance = async ({
  tokenAddress,
  tokenId = '0',
  provider,
  publicKeyHash
}: GetCollectibleBalanceArg) => {
  const contract1155 = Erc1155Abi__factory.connect(tokenAddress, provider);
  const balance = await contract1155.balanceOf(publicKeyHash, tokenId);

  return balance.toString();
};

export const getCollectibleBalance = ({
  tokenAddress,
  tokenId = '0',
  provider,
  publicKeyHash,
  standard
}: GetCollectibleBalanceArg & { standard?: TokenStandardEnum }) => {
  if (!isDefined(standard)) {
    return '0';
  }

  return standard === TokenStandardEnum.ERC721
    ? getErc721CollectibleBalance({ tokenAddress, tokenId, provider, publicKeyHash })
    : getErc1155CollectibleBalance({ tokenAddress, tokenId, provider, publicKeyHash });
};
