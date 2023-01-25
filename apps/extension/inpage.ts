import { inpageStream } from './src/constants/page-streams';
import { initializeProvider } from './src/dapp-connection-provider';

// setup background connection

initializeProvider({
  connectionStream: inpageStream
});
