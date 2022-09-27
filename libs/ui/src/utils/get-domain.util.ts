export const getDomain = (address: string) => {
  const domain = address.split('https://')[1];
  const slash = domain[domain.length - 1] === '/';

  return slash ? domain.slice(0, domain.length - 1) : domain;
};
