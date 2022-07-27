import { Alert } from 'react-native';

export const confirmRemoveAction = (handleRemoveNetwork: () => void) => {
  Alert.alert('Confirmation', 'Are you sure that you want to delete the network?', [
    {
      text: 'Cancel',
      style: 'cancel'
    },
    { text: 'OK', onPress: handleRemoveNetwork }
  ]);
};
