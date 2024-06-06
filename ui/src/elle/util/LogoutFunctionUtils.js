let navigateFunction;
let clearUserContextFunction;

export const setLogoutFunctions = (navigate, clearUserContext) => {
  navigateFunction = navigate;
  clearUserContextFunction = clearUserContext;
};

export const navigateTo = (path) => {
  navigateFunction(path);
  window.scrollTo(0, 0);
};

export const clearUserContext = () => {
  clearUserContextFunction();
};
