import { WindowPostMessageStream } from '@metamask/post-message-stream';

const CONTENT_SCRIPT = 'oko-contentscript';
const INPAGE = 'oko-inpage';
export const PROVIDER = 'oko-provider';

export const pageStream = new WindowPostMessageStream({
  name: CONTENT_SCRIPT,
  target: INPAGE
});
