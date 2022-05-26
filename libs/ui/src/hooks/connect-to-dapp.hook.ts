import WalletConnect from '@walletconnect/client';
import { useEffect, useState } from 'react';

import { usePublicKeyHashSelector } from '../store/wallet/wallet.selectors';

// Connect to pancakeswap.finance
const BSC_RPC = {
  url: 'https://bsc-dataseed.binance.org/',
  chainId: 56
};

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
  const [address, setAddress] = useState<string>(pkh);
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    if (connector) {
      connector.on('session_request', (error, payload) => {
        if (error) {
          throw error;
        }
        const { peerMeta } = payload.params[0];
        // Payload has chainId
        setPeerMeta(peerMeta);
      });

      connector.on('session_update', error => {
        if (error) {
          throw error;
        }
      });

      connector.on('call_request', async error => {
        if (error) {
          throw error;
        }
      });

      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }

        setPayload(payload);
        setConnected(true);
      });

      connector.on('disconnect', error => {
        if (error) {
          throw error;
        }
      });

      if (connector.connected) {
        const { accounts } = connector;
        const index = 0;
        const address = accounts[index];
        setAddress(address);
        setConnected(true);
      }
      setConnector(connector);
    }
  }, [connector]);

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
      connector.approveSession({ accounts: [address], rpcUrl: BSC_RPC.url, chainId: BSC_RPC.chainId });
    }
    setConnector(connector);
  };

  const rejectSession = () => {
    if (connector) {
      connector.rejectSession();
    }
    setConnector(connector);
  };

  return {
    approveSession,
    rejectSession,
    onSubmit,
    setUriValue,
    peerMeta,
    connected,
    uri,
    address,
    payload
  };
};
