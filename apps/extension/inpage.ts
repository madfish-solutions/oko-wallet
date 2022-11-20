import { WindowPostMessageStream } from '@metamask/post-message-stream';

import { initializeProvider } from './src/dapp-connection-provider';

// need to make sure we aren't affected by overlapping namespaces
// and that we don't affect the app with our namespace
// mostly a fix for web3's BigNumber if AMD's "define" is defined...

// contexts
const CONTENT_SCRIPT = 'oko-contentscript';
const INPAGE = 'oko-inpage';

console.log('ingected');

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
