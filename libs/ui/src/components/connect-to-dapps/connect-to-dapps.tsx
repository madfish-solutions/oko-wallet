import React from 'react';
import { Button, Text, View } from 'react-native';

import { useConnectToDapp } from '../../hooks/connect-to-dapp.hook';
import { Input } from '../input/input';

export const ConnectToDapps = () => {
  const { setUriValue, onSubmit, killSession, connected, peerMeta, approveSession, rejectSession, address, uri } =
    useConnectToDapp();

  return (
    <View>
      <Text>Connect to Dapp</Text>
      <Input value={uri} onChangeText={setUriValue} />
      <Button title="Connect" onPress={onSubmit} />
      <Button title="killSession" onPress={killSession} />

      {!connected && peerMeta.name !== '' ? (
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
      ) : null}

      {connected ? (
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
      ) : null}
    </View>
  );
};
