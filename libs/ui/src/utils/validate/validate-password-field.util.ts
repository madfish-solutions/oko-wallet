export const passwordValidationFactory = () => {
  return (value?: string) => {
    const isEmptyField = value?.trim().length === 0;
    if (isEmptyField) {
      return "Required custom error";
    }
    // ... 
    return true;
  };
};
