export const confirmRemoveAction = (handleRemoveNetwork: () => void) => {
  // eslint-disable-next-line no-alert
  const result = confirm('Are you sure that you want to delete the network?');

  if (result) {
    handleRemoveNetwork();
  }
};
