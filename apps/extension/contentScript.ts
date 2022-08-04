import browser from 'webextension-polyfill';

const myPort = browser.runtime.connect({ name: 'port-from-cs' });

window.addEventListener('message', async evt => {
  console.log(evt, 'CONTENT!!');
  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_requestAccounts') {
    myPort.postMessage('hello from content script');
    myPort.postMessage(evt.data);
  }
});

browser.runtime.onMessage.addListener(request => {
  console.log('Message from the background script:');
  console.log(request, 'CONTENT SCRIPT WORKS');
  window.postMessage(request, '*');
});
