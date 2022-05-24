/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import WalletConnect from '@walletconnect/client';
import React from 'react';
import { Button, Text, View } from 'react-native';

import { DEFAULT_ACTIVE_INDEX, DEFAULT_CHAIN_ID } from '../../constants/defaults';
import { getAppConfig } from '../../constants/get-app-config';
import { getAppControllers } from '../../controllers';
import { IAppState } from '../../interfaces/app-config.inrerface';
import { getCachedSession } from '../../utils/get-cached-session.utils';
import { Input } from '../input/input';

export const DEFAULT_ACCOUNTS = getAppControllers().wallet.getAccounts();
export const DEFAULT_ADDRESS = DEFAULT_ACCOUNTS[DEFAULT_ACTIVE_INDEX];

export const INITIAL_STATE: IAppState = {
  loading: false,
  scanner: false,
  connector: null,
  uri: '',
  peerMeta: {
    description: '',
    url: '',
    icons: [],
    name: '',
    ssl: false
  },
  connected: false,
  chainId: getAppConfig().chainId || DEFAULT_CHAIN_ID,
  accounts: DEFAULT_ACCOUNTS,
  address: DEFAULT_ADDRESS,
  activeIndex: DEFAULT_ACTIVE_INDEX,
  requests: [],
  results: [],
  payload: null
};

export class ConnectToDappsClass extends React.Component<any> {
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  public componentDidMount() {
    this.init();
  }

  public init = async () => {
    let { activeIndex, chainId } = this.state;

    const session = getCachedSession();

    if (!session) {
      await getAppControllers().wallet.init(activeIndex, chainId);
    } else {
      const connector = new WalletConnect({ session });

      const { connected, accounts, peerMeta } = connector;

      const address = accounts[0];

      activeIndex = accounts.indexOf(address);
      chainId = connector.chainId;

      await getAppControllers().wallet.init(activeIndex, chainId);

      await this.setState({
        connected,
        connector,
        address,
        activeIndex,
        accounts,
        chainId,
        peerMeta
      });

      this.subscribeToEvents();
    }
    await getAppConfig().events.init(this.state, this.bindedSetState);
  };

  public bindedSetState = (newState: Partial<IAppState>) => this.setState(newState);

  public initWalletConnect = async () => {
    const { uri } = this.state;

    this.setState({ loading: true });

    try {
      const connector = new WalletConnect({ uri });

      if (!connector.connected) {
        await connector.createSession();
      }

      await this.setState({
        loading: false,
        connector,
        uri: connector.uri
      });

      this.subscribeToEvents();
    } catch (error) {
      this.setState({ loading: false });

      throw error;
    }
  };

  public approveSession = () => {
    console.log('ACTION', 'approveSession');
    const { connector, chainId, address } = this.state;
    if (connector) {
      connector.approveSession({ chainId, accounts: [address] });
    }
    this.setState({ connector });
  };

  public rejectSession = () => {
    console.log('ACTION', 'rejectSession');
    const { connector } = this.state;
    if (connector) {
      connector.rejectSession();
    }
    this.setState({ connector });
  };

  public killSession = () => {
    console.log('ACTION', 'killSession');
    const { connector } = this.state;
    if (connector) {
      connector.killSession();
    }
    ('');
    this.resetApp();
  };

  public resetApp = async () => {
    await this.setState({ ...INITIAL_STATE });
    this.init();
  };

  public subscribeToEvents = () => {
    console.log('ACTION', 'subscribeToEvents');
    const { connector } = this.state;

    if (connector) {
      connector.on('session_request', (error, payload) => {
        console.log('EVENT', 'session_request');

        if (error) {
          throw error;
        }
        console.log('SESSION_REQUEST', payload.params);
        const { peerMeta } = payload.params[0];
        this.setState({ peerMeta });
      });

      connector.on('session_update', error => {
        console.log('EVENT', 'session_update');

        if (error) {
          throw error;
        }
      });

      connector.on('call_request', async (error, payload) => {
        // tslint:disable-next-line
        console.log('EVENT', 'call_request', 'method', payload.method);
        console.log('EVENT', 'call_request', 'params', payload.params);

        if (error) {
          throw error;
        }

        await getAppConfig().rpcEngine.router(payload, this.state, this.bindedSetState);
      });

      connector.on('connect', (error, payload) => {
        console.log('EVENT', 'connect', payload);

        if (error) {
          throw error;
        }

        this.setState({ connected: true });
      });

      connector.on('disconnect', (error, payload) => {
        console.log('EVENT', 'disconnect', payload);

        if (error) {
          throw error;
        }

        this.resetApp();
      });

      if (connector.connected) {
        const { chainId, accounts } = connector;
        const index = 0;
        const address = accounts[index];
        getAppControllers().wallet.update(index, chainId);
        this.setState({
          connected: true,
          address,
          chainId
        });
      }

      this.setState({ connector });
    }
  };

  public updateSession = async (sessionParams: { chainId?: number; activeIndex?: number }) => {
    const { connector, chainId, accounts, activeIndex } = this.state;
    const newChainId = sessionParams.chainId || chainId;
    const newActiveIndex = sessionParams.activeIndex || activeIndex;
    const address = accounts[newActiveIndex];
    if (connector) {
      connector.updateSession({
        chainId: newChainId,
        accounts: [address]
      });
    }
    await this.setState({
      connector,
      address,
      accounts,
      activeIndex: newActiveIndex,
      chainId: newChainId
    });
    await getAppControllers().wallet.update(newActiveIndex, newChainId);
    await getAppConfig().events.update(this.state, this.bindedSetState);
  };

  public updateChain = async (chainId: number | string) => {
    await this.updateSession({ chainId: Number(chainId) });
  };

  public updateAddress = async (activeIndex: number) => {
    await this.updateSession({ activeIndex });
  };

  public toggleScanner = () => {
    console.log('ACTION', 'toggleScanner');
    this.setState({ scanner: !this.state.scanner });
  };

  public onQRCodeValidate = (data: string): any => {
    const res: any = {
      error: null,
      result: null
    };
    try {
      res.result = data;
    } catch (error) {
      res.error = error;
    }

    return res;
  };

  public onQRCodeScan = async (data: any) => {
    const uri = typeof data === 'string' ? data : '';
    if (uri) {
      await this.setState({ uri });
      await this.initWalletConnect();
      this.toggleScanner();
    }
  };

  public onURIPaste = async () => {
    const data = this.state.uri;
    const uriStr = typeof data === 'string' ? data : '';
    if (uriStr) {
      await this.setState({ uri: uriStr });
      await this.initWalletConnect();
    }
  };

  public onQRCodeError = (error: Error) => {
    throw error;
  };

  public onQRCodeClose = () => this.toggleScanner();

  public openRequest = async (request: any) => {
    const payload = Object.assign({}, request);

    const params = payload.params[0];
    if (request.method === 'eth_sendTransaction') {
      payload.params[0] = await getAppControllers().wallet.populateTransaction(params);
    }

    this.setState({
      payload
    });
  };

  public closeRequest = async () => {
    const { requests, payload } = this.state;
    const filteredRequests = requests.filter(request => request.id !== payload.id);
    await this.setState({
      requests: filteredRequests,
      payload: null
    });
  };

  public approveRequest = async () => {
    const { connector, payload } = this.state;

    try {
      await getAppConfig().rpcEngine.signer(payload, this.state, this.bindedSetState);
    } catch (error) {
      console.error(error);
      if (connector) {
        connector.rejectRequest({
          id: payload.id,
          error: { message: 'Failed or Rejected Request' }
        });
      }
    }

    this.closeRequest();
    await this.setState({ connector });
  };

  public rejectRequest = async () => {
    const { connector, payload } = this.state;
    if (connector) {
      connector.rejectRequest({
        id: payload.id,
        error: { message: 'Failed or Rejected Request' }
      });
    }
    await this.closeRequest();
    await this.setState({ connector });
  };

  public render() {
    const { peerMeta, uri, payload, connected, results, address, activeIndex } = this.state;

    return (
      <View>
        <Text>Connect to Dapp</Text>
        <Input value={uri} onChangeText={e => this.setState({ uri: e })} />
        <Button title="Connect" onPress={this.onURIPaste} />

        {peerMeta && peerMeta.name && (
          <View>
            <Text>Dapp request</Text>
            <Text>
              {JSON.stringify(
                {
                  peerMeta
                },
                null,
                2
              )}
            </Text>
            <Button onPress={this.approveSession} title="Approve" />
            <Button onPress={this.rejectSession} title="Reject" />
          </View>
        )}

        {connected && (
          <View>
            <Text>{`Connected to: ${peerMeta.name}`}</Text>
            <Text>
              {JSON.stringify(
                {
                  payload,
                  activeIndex,
                  results,
                  address
                },
                null,
                2
              )}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
