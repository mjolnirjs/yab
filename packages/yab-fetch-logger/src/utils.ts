export const parseUrl = (url: string) => {
  const defaultProtocol = url.startsWith('//') ? window.location.protocol : '';

  return new URL(`${defaultProtocol}${url}`);
};
