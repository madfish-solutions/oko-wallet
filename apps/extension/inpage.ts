import { inpageStream } from './src/constants/content-script';
import { initializeProvider } from './src/dapp-connection-provider';

// setup background connection

initializeProvider({
  connectionStream: inpageStream
});
