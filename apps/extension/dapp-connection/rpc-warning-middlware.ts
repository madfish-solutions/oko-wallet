import type { JsonRpcMiddleware } from 'json-rpc-engine';

/**
 * Create JSON-RPC middleware that logs warnings for deprecated RPC methods.
 *
 * @param log - The logging API to use.
 * @returns The JSON-RPC middleware.
 */
export function createRpcWarningMiddleware(): JsonRpcMiddleware<unknown, unknown> {
  const sentWarnings = {
    ethDecryptDeprecation: false,
    ethGetEncryptionPublicKeyDeprecation: false
  };

  return (req, _res, next) => {
    if (sentWarnings.ethDecryptDeprecation === false && req.method === 'eth_decrypt') {
      sentWarnings.ethDecryptDeprecation = true;
    } else if (
      sentWarnings.ethGetEncryptionPublicKeyDeprecation === false &&
      req.method === 'eth_getEncryptionPublicKey'
    ) {
      sentWarnings.ethGetEncryptionPublicKeyDeprecation = true;
    }
    next();
  };
}