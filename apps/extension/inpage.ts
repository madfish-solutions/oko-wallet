// need to make sure we aren't affected by overlapping namespaces
// and that we dont affect the app with our namespace
// mostly a fix for web3's BigNumber if AMD's "define" is defined...

import { WindowPostMessageStream } from '@metamask/post-message-stream';

import { initializeProvider } from './dapp-connection/initialize-provider';

// contexts
const CONTENT_SCRIPT = 'oko-contentscript';
const INPAGE = 'oko-inpage';

//
// setup plugin communication
//

// setup background connection
const stream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT
});

initializeProvider({
  connectionStream: stream
});