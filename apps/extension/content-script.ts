import ObjectMultiplex from '@metamask/object-multiplex';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import pump from 'pump';
import { runtime } from 'webextension-polyfill';

const myPort = runtime.connect({ name: 'port-from-cs' });

const prepareResponse = (result: unknown, id: number) => ({
  data: {
    data: { id: Number(id), jsonrpc: '2.0', result },
    name: 'metamask-provider'
  },
  target: 'metamask-inpage'
});

const CONTENT_SCRIPT = 'metamask-contentscript';
const INPAGE = 'metamask-inpage';
const PROVIDER = 'metamask-provider';

const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});

// listen background-script and send message to dapps
myPort.onMessage.addListener(async msg => {
  let request;
  if (msg.target === 'request') {
    request = prepareResponse([msg.result.address], msg.id);
  }
  if (msg.target === 'providerState') {
    const result = { accounts: [msg.result.address], chainId: '0x1', isUnlocked: true, networkVersion: '56' };
    request = prepareResponse(result, msg.id);
  }
  if (msg.target === 'chainId') {
    console.log('CHAIN ID', msg.result.chainId);
    request = prepareResponse(msg.result.chainId ?? '0x2019', msg.id);
  }

  console.log('SEND TO DAPPS AFT BG', request);
  window.postMessage(request, '*');

  return Promise.resolve();
});

// listen dapps and send message to backgorund-script
window.addEventListener('message', async evt => {
  if (evt.data?.target === 'metamask-contentscript') {
    console.log(evt.data, 'messages from dapps');
    myPort.postMessage({ data: evt.data, origin: evt.origin });

    return Promise.resolve();
  }
  if (evt.data?.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'wallet_switchEthereumChain') {
    myPort.postMessage({ data: evt.data, origin: evt.origin });

    return Promise.resolve();
  }
});

runtime.onMessage.addListener(async (request: unknown) => {
  console.log('SEND TO DAPPS DIRECTLY', request);
  window.postMessage(request, '*');

  return Promise.resolve();
});

// create and connect channel muxers
// so we can handle the channels individually
const pageMux = new ObjectMultiplex();
pageMux.setMaxListeners(25);

pump(pageMux, pageStream, pageMux, err => console.log(err));

pageMux.createStream(PROVIDER);
