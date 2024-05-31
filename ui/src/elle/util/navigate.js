let navigateFunction;

export const setNavigateFunction = (navigate) => {
  navigateFunction = navigate;
};

export const navigateTo = (path) => {
  navigateFunction(path);
  window.scrollTo(0, 0);
};
