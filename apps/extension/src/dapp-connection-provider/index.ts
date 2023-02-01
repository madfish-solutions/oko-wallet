/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/strict-boolean-expressions */

import { Duplex } from 'stream';

import { InpageProvider, InpageProviderOptions } from './inpage-provider';
import { shimWeb3 } from './shim-web3';

interface InitializeProviderOptions extends InpageProviderOptions {
  /**
   * The stream used to connect to the wallet.
   */
  connectionStream: Duplex;

  /**
   * Whether the provider should be set as window.ethereum.
   */
  shouldSetOnWindow?: boolean;

  /**
   * Whether the window.web3 shim should be set.
   */
  shouldShimWeb3?: boolean;
}

/**
 * Initializes a InpageProvider and (optionally) assigns it as window.ethereum.
 *
 * @param options - An options bag.
 * @param options.connectionStream - A Node.js stream.
 * @param options.jsonRpcStreamName - The name of the internal JSON-RPC stream.
 * @param options.maxEventListeners - The maximum number of event listeners.
 * @param options.shouldSetOnWindow - Whether the provider should be set as window.ethereum.
 * @returns The initialized provider (whether set or not).
 */
export function initializeProvider({
  connectionStream,
  jsonRpcStreamName,
  logger = console,
  maxEventListeners = 100,
  shouldSetOnWindow = true
}: InitializeProviderOptions): InpageProvider {
  const anotherProvider = (window as Record<string, any>).ethereum ? [(window as Record<string, any>).ethereum] : [];
  const provider = new InpageProvider(connectionStream, {
    jsonRpcStreamName,
    logger,
    maxEventListeners,
    anotherProvider
  });

  const proxiedProvider = new Proxy(provider, {
    // some common libraries, e.g. web3@1.x, mess with our API
    deleteProperty: () => true
  });

  shimWeb3(proxiedProvider);

  if (shouldSetOnWindow) {
    setGlobalProvider(proxiedProvider);
  }

  return proxiedProvider;
}

/**
 * Sets the given provider instance as window.ethereum and dispatches the
 * 'ethereum#initialized' event on window.
 *
 * @param providerInstance - The provider instance.
 */
export function setGlobalProvider(providerInstance: InpageProvider): void {
  (window as Record<string, any>).ethereum = providerInstance;
  window.dispatchEvent(new Event('ethereum#initialized'));
}
