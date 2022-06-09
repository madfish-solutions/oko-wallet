import WalletConnect from '@walletconnect/client';
import { useEffect, useState } from 'react';

import { ClientPeerMeta, WalletConnectSession } from '../interfaces/connect-wallet.interface';
import { useSelectedAccountPublicKeyHashSelector } from '../store/wallet/wallet.selectors';

const peerMetaInitialValue = {
  description: '',
  url: '',
  icons: [],
  name: '',
  ssl: false
};

export const useConnectToDapp = () => {
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState('');
  const [peerMeta, setPeerMeta] = useState<ClientPeerMeta>(peerMetaInitialValue);
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState(1);

  const selectedAccountPkh = useSelectedAccountPublicKeyHashSelector();

  const getCachedSession = (): WalletConnectSession | null =>
    JSON.parse(localStorage.getItem('walletconnect') as string) ?? null;

  useEffect(() => {
    const session = getCachedSession();

    if (session !== null && session.peerMeta) {
      setPeerMeta(session.peerMeta);
      setConnected(session.connected);
    }
  }, []);

  useEffect(() => {
    if (connector !== null) {
      connector.on('session_request', (error, payload) => {
        if (error !== null) {
          throw `session_request: ${error}`;
        }

        const { peerMeta, chainId } = payload.params[0];

        setChainId(chainId);
        setPeerMeta(peerMeta);
      });

      connector.on('session_update', error => {
        if (error !== null) {
          throw `session_update: ${error}`;
        }
      });

      connector.on('call_request', async error => {
        if (error !== null) {
          throw `call_request: ${error}`;
        }
      });

      connector.on('connect', error => {
        if (error !== null) {
          throw `connect: ${error}`;
        }

        setConnected(true);
      });

      connector.on('disconnect', error => {
        if (error !== null) {
          throw `disconnect: ${error}`;
        }

        setConnected(false);
        setPeerMeta(peerMetaInitialValue);
      });

      setConnector(connector);
    }
  }, [connector, selectedAccountPkh]);

  const approveSession = () => {
    if (connector !== null) {
      connector.approveSession({
        accounts: [selectedAccountPkh],
        chainId
      });
    }
    setConnector(connector);
  };

  const rejectSession = () => {
    if (connector !== null) {
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
    await connectWalletToDapp();
  };

  const connectWalletToDapp = async () => {
    try {
      const walletConnector = new WalletConnect({ uri });

      if (walletConnector.connected === false) {
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
    setUri,
    killSession,
    peerMeta,
    connected,
    uri,
    address: selectedAccountPkh
  };
};
