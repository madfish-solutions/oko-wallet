import WalletConnect from '@walletconnect/client';
import { useEffect, useState } from 'react';

import { ClientPeerMeta } from '../interfaces/connect-wallet.interface';
import { useSelectedAccountPkhSekector } from '../store/wallet/wallet.selectors';
import { getCachedSession } from '../utils/dapps/get-cached-session.utils';

const peerMetaInitialValue = {
  description: '',
  url: '',
  icons: [],
  name: '',
  ssl: false
};

export const useConnectToDapp = () => {
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState<string>('');
  const [peerMeta, setPeerMeta] = useState<ClientPeerMeta>(peerMetaInitialValue);
  const [connected, setConnected] = useState<boolean>(false);
  const [chainId, setChainId] = useState<number>(1);

  const selectedAccountPkh = useSelectedAccountPkhSekector();

  useEffect(() => {
    const session = getCachedSession();

    if (session && session.peerMeta) {
      setPeerMeta(session.peerMeta);
      setConnected(session.connected);
    }
  }, []);

  useEffect(() => {
    if (connector) {
      connector.on('session_request', (error, payload) => {
        if (error) {
          throw `session_request: ${error}`;
        }
        const { peerMeta, chainId } = payload.params[0];

        setChainId(chainId);
        setPeerMeta(peerMeta);
      });

      connector.on('session_update', error => {
        if (error) {
          throw `session_update: ${error}`;
        }

        setConnected(true);
      });

      connector.on('call_request', async error => {
        if (error) {
          throw `call_request: ${error}`;
        }
      });

      connector.on('connect', error => {
        if (error) {
          throw `connect: ${error}`;
        }

        setConnected(true);
      });

      connector.on('disconnect', error => {
        if (error) {
          throw `disconnect: ${error}`;
        }

        setConnected(false);
        setPeerMeta(peerMetaInitialValue);
      });

      if (connector.connected) {
        setConnected(true);
      }
      setConnector(connector);
    }
  }, [connector, selectedAccountPkh]);

  const setUriValue = (newUri: string) => {
    setUri(newUri);
  };

  const approveSession = () => {
    if (connector) {
      connector.approveSession({
        accounts: [selectedAccountPkh],
        chainId: chainId
      });
    }
    setConnector(connector);
  };

  const rejectSession = () => {
    if (connector) {
      connector.rejectSession();
    }
    setConnector(connector);
  };

  const killSession = () => {
    const session = getCachedSession();

    if (session) {
      const walletConnector = new WalletConnect({ session });
      walletConnector.killSession();
      setConnector(walletConnector);
    }
  };

  const onSubmit = async () => {
    const uriIsString = typeof uri === 'string';

    if (uriIsString) {
      await connectWalletToDapp();
    }
  };

  const connectWalletToDapp = async () => {
    try {
      const walletConnector = new WalletConnect({ uri });

      if (!walletConnector.connected) {
        await walletConnector.createSession();
      }

      setUri('');
      setConnector(walletConnector);
    } catch (error) {
      throw error;
    }
  };

  return {
    approveSession,
    rejectSession,
    onSubmit,
    setUriValue,
    killSession,
    peerMeta,
    connected,
    uri,
    address: selectedAccountPkh
  };
};
