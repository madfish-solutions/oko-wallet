import { Alert } from 'react-native';

export const confirmRemoveAction = (handleRemoveNetwork: () => void) => {
  Alert.alert('Confirmation', 'Remove this network?', [
    {
      text: 'Cancel',
      style: 'cancel'
    },
    { text: 'OK', onPress: handleRemoveNetwork }
  ]);
};
