// need to make sure we aren't affected by overlapping namespaces
// and that we dont affect the app with our namespace
// mostly a fix for web3's BigNumber if AMD's "define" is defined...

/* eslint-disable import/first */
import { WindowPostMessageStream } from '@metamask/post-message-stream';

import { initializeProvider } from './dapp-connection/initialize-provider';

// contexts
const CONTENT_SCRIPT = 'metamask-contentscript';
const INPAGE = 'metamask-inpage';

//
// setup plugin communication
//

// setup background connection
const metamaskStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT
});

initializeProvider({
  connectionStream: metamaskStream,
  shouldShimWeb3: true
});
