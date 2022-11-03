import ObjectMultiplex from '@metamask/object-multiplex';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import pump from 'pump';
import { runtime } from 'webextension-polyfill';

const myPort = runtime.connect({ name: 'port-from-cs' });

const prepareResponse = (result: unknown, id: number, method: string) => ({
  data: {
    data: { id: Number(id), jsonrpc: '2.0', method, result },
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

myPort.onMessage.addListener(async msg => {
  if (msg.target === 'requestAccounts') {
    const request = prepareResponse(msg.result, msg.id, 'eth_requestAccounts');

    window.postMessage(request, '*');

    return Promise.resolve();
  }
});

window.addEventListener('message', async evt => {
  console.log('content-script', evt.data.data.data?.id, evt);
  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_requestAccounts') {
    myPort.postMessage({ data: evt.data, origin: evt.origin });

    return Promise.resolve();
  }
  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'wallet_switchEthereumChain') {
    myPort.postMessage({ data: evt.data, origin: evt.origin });

    return Promise.resolve();
  }

  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_chainId') {
    const ethResponse = {
      data: {
        data: { id: evt.data?.data?.data?.id, jsonrpc: '2.0', method: 'eth_chainId', result: '0x2019' },
        name: 'metamask-provider'
      },
      target: 'metamask-inpage'
    };

    window.postMessage(ethResponse, '*');

    return Promise.resolve();
  }
});

runtime.onMessage.addListener(async (request: any) => {
  window.postMessage(request, '*');

  return Promise.resolve();
});

// create and connect channel muxers
// so we can handle the channels individually
const pageMux = new ObjectMultiplex();
pageMux.setMaxListeners(25);

pump(pageMux, pageStream, pageMux, err => console.log(err));

pageMux.createStream(PROVIDER);
