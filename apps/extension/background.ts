import browser from 'webextension-polyfill';

console.log('Background script is working...');

browser.runtime.onMessage.addListener(async (msg, sender) => {
  console.log(msg, 'MESSAGE');
  if (msg.target === 'metamask-contentscript' && msg.data?.data?.method === 'eth_requestAccounts') {
    console.log('it is connection request!!!');
    await browser.windows.create({
      type: 'popup',
      url: browser.runtime.getURL('index.html'),
      width: 380,
      height: 630,
      top: 20,
      left: 20
    });
  }
});
