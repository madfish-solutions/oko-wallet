import WalletConnect from '@walletconnect/client';
import { useEffect, useState } from 'react';

import { ClientPeerMeta, WalletConnectSession } from '../interfaces/connect-wallet.interface';
import { useSelectedAccountPublicKeyHashSelector } from '../store/wallet/wallet.selectors';

import { useLocalStorage } from './use-local-storage.hook';

const peerMetaInitialValue = {
  description: '',
  url: '',
  icons: [],
  name: '',
  ssl: false
};

/** @deprecated */
export const useConnectToDapp = () => {
  const [connector, setConnector] = useState<WalletConnect | null>(null);
  const [uri, setUri] = useState('');
  const [peerMeta, setPeerMeta] = useState<ClientPeerMeta>(peerMetaInitialValue);
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState(1);
  const { clearStorageValue, localStorageValue, setLocalStorageValue } = useLocalStorage<WalletConnectSession | null>(
    'walletconnect',
    null
  );
  const [isConnecting, setIsConnecting] = useState(false);

  const publicKeyHash = useSelectedAccountPublicKeyHashSelector();

  useEffect(() => {
    if (localStorageValue?.peerMeta) {
      setPeerMeta(localStorageValue.peerMeta);
      setConnected(localStorageValue.connected);
    }
  }, [localStorageValue]);

  useEffect(() => {
    if (connector !== null) {
      connector.on('session_request', (error, payload) => {
        if (error !== null) {
          throw `session_request: ${error}`;
        }

        const param = payload.params[0];

        setIsConnecting(false);
        setChainId(param.chainId);
        setPeerMeta(param.peerMeta);
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
        clearStorageValue();
        setConnector(null);
      });

      setConnector(connector);
    }
  }, [connector, publicKeyHash]);

  const approveSession = () => {
    if (connector !== null) {
      connector.approveSession({
        accounts: [publicKeyHash],
        chainId
      });

      const dataToAsyncStore = {
        accounts: connector.accounts,
        bridge: connector.bridge,
        chainId: connector.chainId,
        clientId: connector.clientId,
        clientMeta: connector.clientMeta,
        connected: connector.connected,
        handshakeId: connector.handshakeId,
        handshakeTopic: connector.handshakeTopic,
        key: connector.key,
        peerId: connector.peerId,
        peerMeta: connector.peerMeta
      };

      setLocalStorageValue(dataToAsyncStore);
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
    if (localStorageValue) {
      const walletConnector = new WalletConnect({ session: localStorageValue });
      walletConnector.killSession();
      setConnector(walletConnector);
      clearStorageValue();
      setPeerMeta(peerMetaInitialValue);
      setConnected(false);
    }
  };

  const onSubmit = async () => {
    await connectWalletToDapp();
  };

  const connectWalletToDapp = async () => {
    try {
      setIsConnecting(true);

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
    setUri,
    killSession,
    peerMeta,
    connected,
    uri,
    address: publicKeyHash,
    isConnecting
  };
};
