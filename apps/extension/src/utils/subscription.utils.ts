export const unsafeRandomBytes = (byteCount: number) => {
  let result = '0x';
  for (let i = 0; i < byteCount; i++) {
    result += unsafeRandomNibble();
    result += unsafeRandomNibble();
  }

  return result;
};

const unsafeRandomNibble = () => Math.floor(Math.random() * 16).toString(16);
