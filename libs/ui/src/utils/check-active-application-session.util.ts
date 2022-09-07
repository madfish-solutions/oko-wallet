export const checkActiveApplicationSession = () => {
  const { pathname } = window.location;

  const isPopupOpened = pathname.includes('popup.html');
  const isMaximiseScreenOpened = pathname.includes('fullpage.html');

  return { isPopupOpened, isMaximiseScreenOpened };
};
