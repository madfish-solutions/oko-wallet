const dots = '...';

export const shortize = (text: string, start = 5, end = -5) => {
  if (text.length <= start + dots.length) {
    return text;
  }

  return `${text.slice(0, start)}${dots}${text.slice(end)}`;
};
