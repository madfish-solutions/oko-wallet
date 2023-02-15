export const enum DAppMethodEnum {
  ETH_ACCOUNTS = 'eth_accounts',
  ETH_CALL = 'eth_call',
  //ETH_COINBASE = "eth_coinbase",
  ETH_CHAIN_ID = 'eth_chainId',
  ETH_REQUEST_ACCOUNTS = 'eth_requestAccounts',
  ETH_SEND_TRANSACTION = 'eth_sendTransaction',
  //ETH_SIGN_TRANSACTION = 'eth_signTransaction',
  //ETH_SEND_RAW_TRANSACTION = 'eth_sendRawTransaction',
  ETH_ESTIMATE_GAS = 'eth_estimateGas',
  ETH_GAS_PRICE = 'eth_gasPrice',
  ETH_GET_BALANCE = 'eth_getBalance',
  ETH_GET_TRANSACTION_BY_HASH = 'eth_getTransactionByHash',
  ETH_GET_TRANSACTION_RECEIPT = 'eth_getTransactionReceipt',
  ETH_GET_BLOCK_BY_NUMBER = 'eth_getBlockByNumber',
  ETH_BLOCK_NUMBER = 'eth_blockNumber',
  ETH_SIGN = 'eth_sign',
  ETH_PERSONAL_SIGN = 'personal_sign',
  PERSONAL_EC_RECOVER = 'personal_ecRecover',
  // EHT_GET_ENCRYPTION_PUBLIC_KEY = 'eth_getEncryptionPublicKey',
  // ETH_DECRYPT = "eth_decrypt",
  //WALLET_WATCH_ASSET = 'wallet_watchAsset',
  //METAMASK_WATCH_ASSET = 'metamask_watchAsset',
  WEB3_CLIENT_VERSION = 'web3_clientVersion',
  //ETH_SUBSCRIBE = 'eth_subscribe',
  //ETH_UNSUBSCRIBE = "eth_unsubscribe";
  //NEW_HEADS = 'newHeads',
  NET_VERSION = 'net_version',
  OKO_GET_PROVIDER_STATE = 'oko_getProviderState',
  // LOGS =  "logs",

  //   ETH_SUGN_TYPED_DATA = 'eth_signTypedData',
  //   ETH_SUGN_TYPED_DATA_V3 = 'eth_signTypedData_v3',
  //   ETH_SUGN_TYPED_DATA_V4 = 'eth_signTypedData_v4'
  //   ID = 'id',
  //   METHOD = 'method',
  //   params = 'params',
  WALLET_ADD_ETHEREUM_CHAIN = 'wallet_addEthereumChain',
  WALLET_SWITCH_ETHEREUM_CHAIN = 'wallet_switchEthereumChain',
  WALLET_REQUEST_PERMISSIONS = 'wallet_requestPermissions',
  WALLET_GET_PERMISSIONS = 'wallet_getPermissions'
}
