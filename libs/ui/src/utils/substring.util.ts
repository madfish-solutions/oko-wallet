export const substring = (text: string, value = 20) => (text.length > value ? text.substring(0, value) + '...' : text);
