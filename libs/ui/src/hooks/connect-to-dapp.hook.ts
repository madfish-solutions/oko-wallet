import WalletConnect from '@walletconnect/client';
import { useEffect, useState } from 'react';

import { BSC_RPC } from '../constants/defaults';
import { usePublicKeyHashSelector } from '../store/wallet/wallet.selectors';
import { getCachedSession } from '../utils/dapps/get-cached-session.utils';

export const useConnectToDapp = () => {
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState<string>('');
  const [peerMeta, setPeerMeta] = useState({
    description: '',
    url: '',
    icons: [],
    name: '',
    ssl: false
  });
  const [connected, setConnected] = useState<boolean>(false);
  const pkh = usePublicKeyHashSelector();

  // useEffect(() => {
  //   const session = getCachedSession();

  //   if (session) {
  //     const walletConnector = new WalletConnect({ session });

  //     walletConnector.updateSession({
  //       chainId: BSC_RPC.chainId,
  //       accounts: [pkh]
  //     });
  //     walletConnector.connect();

  //     setConnector(walletConnector);

  //     console.log(walletConnector);
  //   }
  // }, [pkh]);

  // useEffect(() => {
  //   const session = getCachedSession();

  //   if (session) {
  //     setPeerMeta(session.peerMeta as any);
  //     setConnected(session.connected);
  //   }
  // }, []);

  useEffect(() => {
    if (connector) {
      connector.on('session_request', (error, payload) => {
        console.log('SESSION_REQUEST');

        if (error) {
          throw error;
        }
        const { peerMeta } = payload.params[0];
        // Payload has chainId
        setPeerMeta(peerMeta);
      });

      connector.on('session_update', error => {
        console.log('SESSION_UPDATE');

        if (error) {
          throw error;
        }

        setConnected(true);
      });

      connector.on('call_request', async error => {
        console.log('CALL_REQUEST');

        if (error) {
          throw error;
        }
      });

      connector.on('connect', error => {
        console.log('CONNECT');

        if (error) {
          throw error;
        }

        setConnected(true);
      });

      connector.on('disconnect', error => {
        console.log('DISCONNECT');

        if (error) {
          throw error;
        }

        setConnected(false);
        setPeerMeta({
          description: '',
          url: '',
          icons: [],
          name: '',
          ssl: false
        });
      });

      // if (connector.connected) {
      //   setConnected(true);
      // }
      // setConnector(connector);
    }
  }, [connector, pkh]);

  const setUriValue = (newUri: string) => {
    setUri(newUri);
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

  const approveSession = () => {
    if (connector) {
      connector.approveSession({
        accounts: [pkh],
        rpcUrl: BSC_RPC.url,
        chainId: BSC_RPC.chainId
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

  return {
    approveSession,
    rejectSession,
    onSubmit,
    setUriValue,
    killSession,
    peerMeta,
    connected,
    uri,
    address: pkh
  };
};
