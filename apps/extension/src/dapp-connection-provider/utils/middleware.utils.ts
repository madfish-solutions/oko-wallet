import { ethErrors } from 'eth-rpc-errors';
import { createIdRemapMiddleware, JsonRpcMiddleware } from 'json-rpc-engine';

import { ConsoleLike } from '../types/console-like.type';

/**
 * Gets the default middleware for external providers, consisting of an ID
 * remapping middleware and an error middleware.
 *
 * @param logger - The logger to use in the error middleware.
 * @returns An array of json-rpc-engine middleware functions.
 */
export const getDefaultExternalMiddleware = (logger: ConsoleLike = console) => [
  createIdRemapMiddleware(),
  createErrorMiddleware(logger),
  createRpcWarningMiddleware()
];

/**
 * json-rpc-engine middleware that logs RPC errors and and validates req.method.
 *
 * @param log - The logging API to use.
 * @returns A json-rpc-engine middleware function.
 */
function createErrorMiddleware(log: ConsoleLike): JsonRpcMiddleware<unknown, unknown> {
  return (req, res, next) => {
    // json-rpc-engine will terminate the request when it notices this error
    if (typeof req.method !== 'string' || !req.method) {
      res.error = ethErrors.rpc.invalidRequest({
        message: "The request 'method' must be a non-empty string.",
        data: req
      });
    }

    next(done => {
      const { error } = res;
      if (!error) {
        return done();
      }
      log.error(`RPC Error: ${error.message}`, error);

      return done();
    });
  };
}

/**
 * Create JSON-RPC middleware that logs warnings for deprecated RPC methods.
 *
 * @param log - The logging API to use.
 * @returns The JSON-RPC middleware.
 */
function createRpcWarningMiddleware(): JsonRpcMiddleware<unknown, unknown> {
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
