export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const eraseProtocol = (website: string) => website.replace(/(https:\/\/)/, '');
