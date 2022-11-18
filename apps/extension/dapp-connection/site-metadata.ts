export const getWindowMetadata = async () => ({
  name: getSiteName(window),
  favicon: await getSiteFavicon(window)
});

const getSiteName = (windowObject: typeof window): string => {
  const { document } = windowObject;

  const siteName: HTMLMetaElement | null = document.querySelector('head > meta[property="og:site_name"]');
  if (siteName) {
    return siteName.content;
  }

  const metaTitle: HTMLMetaElement | null = document.querySelector('head > meta[name="title"]');
  if (metaTitle) {
    return metaTitle.content;
  }

  if (document.title && document.title.length > 0) {
    return document.title;
  }

  return window.location.hostname;
};

const getSiteFavicon = async (windowObject: typeof window): Promise<string> => {
  const { document } = windowObject;

  const icons: NodeListOf<HTMLLinkElement> = document.querySelectorAll('head > link[rel~="icon"]');
  for (const icon of icons) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (icon && (await imgExists(icon.href))) {
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
