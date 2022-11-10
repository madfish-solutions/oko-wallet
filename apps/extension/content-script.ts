import ObjectMultiplex from '@metamask/object-multiplex';
import { WindowPostMessageStream } from '@metamask/post-message-stream';
import pump from 'pump';
import { runtime } from 'webextension-polyfill';

const myPort = runtime.connect({ name: 'port-from-cs' });

interface DappInfo {
  address: string;
  newChainId?: string;
}

const authorizedDapps: Record<string, DappInfo> = {};

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
    request = prepareResponse(msg.result.chainId, msg.id);
  }

  window.postMessage(request, '*');

  return Promise.resolve();
});

// listen dapps and send message to backgorund-script
window.addEventListener('message', async evt => {
  if (evt.data?.target === 'metamask-contentscript') {
    const method = evt.data?.data?.data?.method;
    const id = evt.data?.data?.data?.id;
    const dappName = evt.origin;

    if (method === 'eth_chainId' && authorizedDapps[dappName]?.newChainId !== undefined) {
      const response = prepareResponse(authorizedDapps[dappName].newChainId, id);

      window.postMessage(response, '*');
      authorizedDapps[dappName].newChainId = undefined;

      return Promise.resolve();
    }
    if (authorizedDapps[dappName]?.address === undefined || method !== 'eth_requestAccounts') {
      myPort.postMessage({ data: evt.data, origin: dappName });

      return Promise.resolve();
    }

    if (method === 'eth_requestAccounts' && authorizedDapps[dappName]?.address !== undefined) {
      const response = prepareResponse(authorizedDapps[dappName]?.address, id);
      window.postMessage(response, '*');

      return Promise.resolve();
    }
  }
});

runtime.onMessage.addListener(async request => {
  const method = request?.data?.data?.method;
  const result = request?.data?.data?.result;
  const dappName = request?.dappName;
  const newChainId = request?.newChain;
  if (method === 'eth_requestAccounts' && result.length > 0) {
    authorizedDapps[dappName] = { address: result };
  }
  if (method === 'wallet_switchEthereumChain') {
    authorizedDapps[dappName] = { ...authorizedDapps[dappName], newChainId };
  }
  window.postMessage(request, '*');

  return Promise.resolve();
});

// create and connect channel muxers
// so we can handle the channels individually
const pageMux = new ObjectMultiplex();
pageMux.setMaxListeners(25);

pump(pageMux, pageStream, pageMux, err => console.log(err));

pageMux.createStream(PROVIDER);
