import browser from 'webextension-polyfill';

window.addEventListener('message', async evt => {
  console.log(evt);
  browser.runtime.sendMessage(evt.data);
  console.log(evt.data);
});
