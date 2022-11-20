import { PendingJsonRpcResponse } from 'json-rpc-engine';

// resolve response.result or response, reject errors

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export const getRpcPromiseCallback =
  (resolve: (value?: any) => void, reject: (error?: Error) => void, unwrapResult = true) =>
  (error: Error, response: PendingJsonRpcResponse<unknown>): void => {
    if (error || response.error) {
      reject(error || response.error);
    } else {
      !unwrapResult || Array.isArray(response) ? resolve(response) : resolve(response.result);
    }
  };
