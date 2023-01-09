import { WindowPostMessageStream } from '@metamask/post-message-stream';

export const CONTENT_SCRIPT = 'oko-contentscript';
export const INPAGE = 'oko-inpage';
export const PROVIDER = 'oko-provider';

export const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});

export const inpageStream = new WindowPostMessageStream({
  name: INPAGE,
  target: CONTENT_SCRIPT
});
