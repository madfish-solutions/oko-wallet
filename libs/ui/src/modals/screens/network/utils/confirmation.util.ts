export const confirmRemoveAction = (handleRemoveNetwork: () => void) => {
  // eslint-disable-next-line no-alert
  const result = confirm('Remove this network?');

  if (result) {
    handleRemoveNetwork();
  }
};
