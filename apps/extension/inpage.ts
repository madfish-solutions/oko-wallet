import { WindowPostMessageStream } from '@metamask/post-message-stream';

import { initializeProvider } from './src/dapp-connection-provider';

const CONTENT_SCRIPT = 'oko-contentscript';
const INPAGE = 'oko-inpage';

// setup background connection
const stream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT
});

initializeProvider({
  connectionStream: stream
});
