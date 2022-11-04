import React from 'react';
import { Button, View } from 'react-native';

import { Input } from '../../../../components/input/input';
import { Text } from '../../../../components/text/text';
import { useConnectToDapp } from '../../../../hooks/connect-to-dapp.hook';

/** @deprecated */
export const ConnectToDapps = () => {
  const {
    setUri,
    onSubmit,
    killSession,
    connected,
    peerMeta,
    approveSession,
    rejectSession,
    address,
    uri,
    isConnecting
  } = useConnectToDapp();

  return (
    <View>
      <Text>Connect to Dapp</Text>
      <Input value={uri} onChangeText={setUri} />
      {!connected ? (
        <Button title="Connect" onPress={onSubmit} disabled={isConnecting} />
      ) : (
        <Button title="killSession" onPress={killSession} />
      )}

      {isConnecting && <Text>Connecting...</Text>}

      {!connected && peerMeta.name !== '' && (
        <View>
          <Text>Dapp confirmation request:</Text>
          <Text>
            {JSON.stringify(
              {
                peerMeta
              },
              null,
              2
            )}
          </Text>
          <Button onPress={approveSession} title="Approve" />
          <Button onPress={rejectSession} title="Reject" />
        </View>
      )}

      {connected && (
        <View>
          <Text>{`Connected to: ${peerMeta.name}`}</Text>
          <Text>
            {JSON.stringify(
              {
                address,
                peerMeta
              },
              null,
              2
            )}
          </Text>
        </View>
      )}
    </View>
  );
};
