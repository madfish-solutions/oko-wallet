import { browser } from 'webextension-polyfill-ts';
import { runtime } from 'webextension-polyfill';

const channel = new BroadcastChannel('Counter');

let counter = 0;

runtime.connect({ name: 'port-from-cs' });

console.log('background');

browser.runtime.onConnect.addListener(async myPort => {
  console.log(myPort);
  
  channel.onmessage = message => {
    console.log(message);
    if (message.data.action === 'add') {
      counter += 1;
      channel.postMessage({ counter, action: 'add', channel: 'counter' });
    }
    if (message.data.action === 'minus') {
      counter -= 1;
      channel.postMessage({ counter, action: 'minus', channel: 'counter' });
    }
    if (message.data.action === 'reset') {
      counter = 0;
      channel.postMessage({ counter, action: 'reset', channel: 'counter' });
    }
  };
}); 
