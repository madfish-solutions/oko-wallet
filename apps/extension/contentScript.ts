import browser from 'webextension-polyfill';

window.addEventListener('message', async evt => {
  console.log(evt);
  browser.runtime.sendMessage(evt.data);
  console.log(evt.data);
  // if (evt.data.method === 'eth_sendTransaction') {
  //   await browser.windows.create({
  //     type: 'popup',
  //     url: browser.runtime.getURL('index.html'),
  //     width: 380,
  //     height: 630,
  //     top: 20,
  //     left: 20
  //   });
  // }
});
