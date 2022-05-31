export const generateUniqueId = (length = 16): number =>
  parseInt(
    Math.ceil(Math.random() * Date.now())
      .toPrecision(length)
      .toString()
      .replace('.', ''),
    10
  );
