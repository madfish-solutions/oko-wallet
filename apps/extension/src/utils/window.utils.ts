export const getWindowMetadata = async () => ({
  name: getSiteName(),
  favicon: await getSiteFavicon()
});

const getSiteName = (): string => {
  const siteName: HTMLMetaElement | null = window.document.querySelector('head > meta[property="og:site_name"]');

  if (siteName) {
    return siteName.content;
  }

  const metaTitle: HTMLMetaElement | null = window.document.querySelector('head > meta[name="title"]');
  if (metaTitle) {
    return metaTitle.content;
  }

  if (window.document.title && window.document.title.length > 0) {
    return window.document.title;
  }

  return window.location.hostname;
};

const getSiteFavicon = async (): Promise<string> => {
  const icons: NodeListOf<HTMLLinkElement> = window.document.querySelectorAll('head > link[rel~="icon"]');

  for (const icon of icons) {
    if (await imgExists(icon.href)) {
      return icon.href;
    }
  }

  return '';
};

const imgExists = (url: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    try {
      const img = document.createElement('img');
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    } catch (e) {
      reject(e);
    }
  });
