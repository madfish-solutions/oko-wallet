const URL_PATTERN =
  /(^(https:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$)|(^http(s)?:\/\/localhost:\d+$)/;

export const isValidUrl = (url: string) => url.match(URL_PATTERN);
