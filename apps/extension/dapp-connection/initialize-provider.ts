import { Duplex } from 'stream';

import { InpageProvider, InpageProviderOptions } from './inpage-provider';

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
 * @param options.shouldSendMetadata - Whether the provider should send page metadata.
 * @param options.shouldSetOnWindow - Whether the provider should be set as window.ethereum.
 * @returns The initialized provider (whether set or not).
 */
export function initializeProvider({
  connectionStream,
  jsonRpcStreamName,
  logger = console,
  maxEventListeners = 100,
  shouldSendMetadata = true,
  shouldSetOnWindow = true
}: InitializeProviderOptions): InpageProvider {
  console.log('injected...');
  const provider = new InpageProvider(connectionStream, {
    jsonRpcStreamName,
    logger,
    maxEventListeners,
    shouldSendMetadata
  });

  const proxiedProvider = new Proxy(provider, {
    // some common libraries, e.g. web3@1.x, mess with our API
    deleteProperty: () => true
  });

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
