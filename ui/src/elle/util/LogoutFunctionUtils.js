let navigateFunction;
let clearContextFunction;

export const setLogoutFunctions = (navigate, clearContext) => {
  navigateFunction = navigate;
  clearContextFunction = clearContext;
};

export const navigateTo = (path) => {
  navigateFunction(path);
  window.scrollTo(0, 0);
};

export const clearContext = () => {
  clearContextFunction();
};
