import browser from 'webextension-polyfill';

// import { store } from '../../libs/ui/src/store/store';
// import { setTransactionFromDapp } from '../../libs/ui/src/store/wallet/wallet.actions';

interface Window {
  ethereum?: any;
}
function injectScript(file, node) {
  const th = document.getElementsByTagName(node);
  const s = document.createElement('script');
  s.setAttribute('type', 'text/javascript');
  s.setAttribute('src', file);
  console.log(th, 'TH');
  th[0].appendChild(s);
}
injectScript(browser.runtime.getURL('scripts/ethereum.js'), 'body');

window.addEventListener('message', async evt => {
  // console.log(window, 'window obj');
  // console.log(evt);

  // browser.runtime.sendMessage(evt.data);
  console.log(evt.data, 'CONTENT!!');
  if (evt.data.target === 'metamask-contentscript' && evt.data?.data?.data?.method === 'eth_requestAccounts') {
    // console.log(evt.data, 'IF WORKS!!!');
    browser.runtime.sendMessage(evt.data);
    //window.newContent = evt.data;
    //injectScript(browser.runtime.getURL('scripts/ethereum.js'), 'body');
    // console.log(window.newContent, 'window NEW CONTENT!!!!!!!!!!!!!');
    // store.dispatch(setTransactionFromDapp(evt.data?.data?.data));
    //console.log('IF WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    // const result = await provider.listAccounts();
    // console.log(result, 'result!!');
    // (window as Window).ethereum
    //   .send({ method: 'eth_requestAccounts' })
    //   .then(result => console.log(result, 'ETHEREUM RESULT!!!'));
  }
});

browser.runtime.onMessage.addListener(request => {
  console.log('Message from the background script:');
  console.log(request, 'CONTENT SCRIPT WORKS');
  //browser.runtime.sendMessage(request);
  window.postMessage(request, '*');
});
