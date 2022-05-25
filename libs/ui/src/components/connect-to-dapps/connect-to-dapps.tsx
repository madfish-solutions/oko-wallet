import React from 'react';
import { Button, Text, View } from 'react-native';

import { useConnectToDapp } from '../../hooks/connect-to-dapp.hook';
import { Input } from '../input/input';

export const ConnectToDapps = () => {
  const { setUriValue, onSubmit, approveSession, rejectSession, uri, peerMeta, connected, address } =
    useConnectToDapp();

  return (
    <View>
      <Text>Connect to Dapp</Text>
      <Input value={uri} onChangeText={setUriValue} />
      <Button title="Connect" onPress={onSubmit} />

      {!connected && peerMeta.name && (
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
                payload: null,
                activeIndex: 0,
                results: [],
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
};
